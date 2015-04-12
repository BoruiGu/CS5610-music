use music;
create table user (
uid int primary key AUTO_INCREMENT,
username varchar(10) not null unique,
password binary(60) not null
);

ALTER TABLE user
MODIFY COLUMN password char(60);