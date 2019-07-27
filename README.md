# Connecting to nodejs container to multiple DB containers

## Introduction

This repo contains a nodejs project that will connect to MySql, MariaDB and Postgres. Depending on the URL hit by the user, the application will pull data from a different DB.

The repo has a docker-compose file that will initialize:

- MySql container
- MariaDB container
- Postgres container
- Nodejs/express container

## Working with dockerfile

We create a dockerfile that will automate the creation of a node application using the official nodejs image from docker hub.

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
- Connect to each DB in TablePlus ( or your favorite sql editor) and run the scripts in the 'sqlscripts' folder:
  - `mySql_DataSetup.sql`
  - `postgres_Datasetup.sql`
  - `mariadb_Datasetup.sql`
- Once the scripts have been run, we can launch the app by going to `localhost:3000` in the browser

### Remove all containers and re-start whole process

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
