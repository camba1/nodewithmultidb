# Connecting to nodejs container to an multiple DB containers

## Introduction

This repo contains a nodejs project that will connect to MySql, MariaDB and Postgres. Depending on the URL hit by the user, the application will pull data from a different DB.

The repo has a docker-compose file that will initialize:

- MySql container
- MariaDB container
- Postgres container
- Nodejs/express container



