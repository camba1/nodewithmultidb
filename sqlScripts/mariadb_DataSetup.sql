CREATE DATABASE `testDB`;

USE `testDB`;

CREATE TABLE `testDB`.`test` (`id` serial,`name` varchar(50) NOT NULL, PRIMARY KEY (id));

insert into test (`name`) VALUES ('Cheese Bread'),('Lasagna'),('Baguette'),('Pizza'),('Spaguetti')

select * from test
