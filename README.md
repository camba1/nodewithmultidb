# Connecting to nodejs container to multiple DB containers

## Introduction

This repo contains a nodejs project that will connect to MySql, MariaDB and Postgres. Depending on the URL hit by the user, the application will pull data from a different DB.

The repo has a docker-compose file that will initialize:

- MySql container
- MariaDB container
- Postgres container
- Nodejs/express container

## Working with dockerfile

We create a dockerfile that will automate the creation of a node application using the official nodejs image from docker hub. The required steps are:

- Creation of a `nodeApp` folder
- Creation of a `src` sub-folder under the `nodeApp` folder
- Creation of a `package.json` file in the nodejs project root directory (`/nodeApp`)
  - If you do not have nodejs installed in your machine, just create one manually
  - Make sure to add dependencies for the libraries we will need
    - `mysql`: library to connect to mySql Database
    - `pg`: library to connect to postgres Database
    - `mariadb`: library to connect to MariaDB Database
    - `express`: minimal node library to simplify work with http servers
- Creation of a `Dockerfile` in the nodejs project root directory (`/nodeApp`)
  - The docker file will create our container based on the nodejs official image
  - It will copy all our code to the image
  - Setup the necessary libraries
  - setup the image to start the nodejs server on container startup
  - Note that it will also include the nodemon library to enable hot reload of the server as we make changes to our codebase
  - Once all this is setup we build our image (assuming that we are in teh same folder as our docker file): `docker build -t nodeforsqlserver .`
  - We can then create a container based on the image we just created: `docker run -p 3000:3000 --name mynode nodeforsqlserver`



## Working with docker-compose

Docker-compose is great to launch and automatically network multiple docker containers. Here we will create a docker-compose.yml file to launch the following:

- **MySql** container created based on the offical MySql image
- **Postgres** container created based on the offical Postgres image
- **MariaDB** container created based on the offical Postgres image
- **Nodejs** container based on the dockerfile we created previously

Then we will take advantage of the fact that docker-compose automatically networks all the containers together to have the nodejs application pull data from each of these databases

Here are the steps to launch the containers:

- In the root directory of the project (where the docker-compose file lives):`docker-compose up`
- This will launch each of the containers one after the other. All messages that come from the initialization of the databases and containers will be displayed on the window
- Once it is finished, we  need to setup some sample data in the databases so that we can pull it from the node app.
- Note that the first time we run the containers, the nodejs container may throw an error. This is because the `node_modules` folder does not exist in the directory that we mapped from the host machine to the container. To correct this, connect to the container `docker exec -it <containerName> 'bash' `and run `npm install`. This will create the `node_modules` folder in the container and thus in our mapped directory in the host.
- Connect to each DB in TablePlus ( or your favorite sql editor) and run the scripts in the 'sqlscripts' folder:
  - `mySql_DataSetup.sql`
  - `postgres_Datasetup.sql`
  - `mariadb_Datasetup.sql`
- Note that the sql scripts only need to run once since we have volumes setup to persist the data between container launches
- Once the scripts have been run, we can launch the app by going to `localhost:3000` in the browser

## Remove all containers and re-start whole process

If for some reason we want to start fresh, like if we had an error, we can follow the follwing steps:

- Ensure the containers are down: `docker ps`
- Bring the containers down: `docker-compose down`
- Remove the contents of the mysqlDB and postgresDB directories (asuming you are already in the nodewithmultidb folder)
```
cd mysqlDB
rm -rf *
cd ..
cd postgresDB
rm -rf *
cd ..
cd MariaDB
rm -rf *
```
- Double check that the containers have been removed: `docker ps -a`
- Remove node image:
```
docker image ls
docker rmi nodewithmultidb_mynodeapp
docker image ls
```

At this point you have removed everything from the machine and are free to start over if needed.

# Adding Nginx support

## Using a dockerfile

nginx will be used as a rverse proxy and load balancer for multiple apps. The first step is to create a configuration file (_nginx/nginx.config_) that will tell nginx what to do:

```
upstream balancedapp {
    server 172.17.0.1:3000 weight=1;
    server 172.17.0.1:3001 weight=1;
}

server {
    location / {
      proxy_pass http://balancedapp;
    }
}
```
In the code above, anytime there is a hit to the root of our site ('/'), we redirect to one of the sites in the balacnedapp section of the configuration. In this case it is pointing to ports 3000 and 3001 of the usual docker ip address. Since we did not specify how to load balance the requests, nginx will just use round robin assignments.

Then we build the docker file:
```
FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
```
This uses the default nginx image and replaces the default configuration file with our custom configuration and rebuilds the image.
Finally, we can run any images we want to load balance on ports 3000 and 3001 and then build & start nginx with:
```
docker build -t nginxfornode .
docker run --name nginxfornode1 -p 5000:80 nginxfornode
```
At that point, we just point the browser to localhost:5000 and watch the magic unfold

## Using docker-compose
