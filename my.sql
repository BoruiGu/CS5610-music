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

alter table comment add time datetime;
alter table comment add commentid int primary key AUTO_INCREMENT;
alter table comment modify column time TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP;
alter table comment add type varchar(10) default 'song';
alter table comment add name varchar(100);

rename table playlist to mylist;

/* Get Comment */
select user.username, comment.time, comment.content
from user
join comment
on user.uid = comment.uid
where comment.id = '1fn6EFBBNiDVhL3DxDDJTD';

/* Following */
select uid, username from user
where uid in
(select uid2 from follow where uid1 = 37);

/* Followed */
select uid, username from user
where uid in
(select uid1 from follow where uid2 = 38);

alter table mylist change content list varchar(65535);

delete from user where username='tf4';

DESCRIBE comment;
SHOW CREATE TABLE mylist;