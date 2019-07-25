FROM node
WORKDIR /code

RUN npm install -g nodemon@1.19.1
RUN npm install mysql
RUN npm install pg
RUN npm install express

COPY package.json /code
RUN npm install && npm ls

COPY . /code

EXPOSE 3000
CMD ["npm","start"]
