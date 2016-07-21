# Schema Information

## Collections
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
user_id     | integer   | not null, foreign key, indexed

## Items
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
title         | string    | not null
image_url     | string    | not null
collection_id | integer   | not null, foreign key, indexed

## Characteristics
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
name          | string    | not null
collection_id | integer   | not null, foreign key, indexed

## Values
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
value             | string    | not null
user_id           | integer   | not null, foreign key, indexed
characteristic_id | integer   | not null, foreign key, indexed

## Users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
