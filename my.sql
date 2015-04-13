use music;
create table user (
uid int primary key AUTO_INCREMENT,
username varchar(10) not null unique,
password binary(60) not null
);

ALTER TABLE user
MODIFY COLUMN password char(60);

ALTER TABLE user
MODIFY COLUMN username varchar(15);

create table follow (
uid1 int not null,
uid2 int not null,
foreign key (uid1) references user(uid),
foreign key (uid2) references user(uid)
);

create table playlist (
uid int not null,
content varchar(65535),
foreign key (uid) references user(uid)
);

create table comment (
uid int not null,
id varchar(30) not null,
content mediumtext,
foreign key (uid) references user(uid)
);