CREATE DATABASE `testDB`;

USE `testDB`;

CREATE TABLE `testDB`.`test` (`id` serial,`name` varchar(50) NOT NULL, PRIMARY KEY (id));

insert into test (`name`) VALUES ('USA'),('Bolivia'),('Chile'),('Colombia'),('India')

select * from test
