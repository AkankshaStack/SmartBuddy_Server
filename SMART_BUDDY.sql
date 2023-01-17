-- Recreating the database
DROP DATABASE IF EXISTS smart_buddy;
CREATE DATABASE smart_buddy;

CREATE TABLE users(
userId INT(64),
username VARCHAR(255),
password VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(userId)
);

CREATE TABLE retail(
retail_id  INT unique,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
productSKU VARCHAR(30),
brand VARCHAR(30),
quantity INT,
price INT,
PRIMARY KEY(retail_id)
);

CREATE TABLE contextual(
contextual_id INT auto_increment unique,
playtime TIME,
device_id INT,
video LONGBLOB,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(contextual_id)
);

CREATE TABLE contextual_play(
contextual_id INT,
played_at date,
device_id  int,
PRIMARY KEY(contextual_id, played_at)
);

-- GAMIFICATION
CREATE TABLE game(
game_id INT auto_increment unique,
game_name VARCHAR(30),
expected_duration INT,
prize VARCHAR(30),
-- user_id
created_by INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(game_id)
);

CREATE TABLE game_play(
game_id INT unique auto_increment,
played_at date,
name VARCHAR(30),
age  INT,
address VARCHAR(30),
-- location:
-- pincode:
-- city:
-- state:
mobile_no VARCHAR(13),
location VARCHAR(30),
PRIMARY KEY(game_id)
);

