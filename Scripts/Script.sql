create table userApi.user(
user_id int(50) not null unique,
name varchar(50)  not null ,
password varchar(50)  not null ,
email varchar(50)  not null unique ,
primary key (user_id)

);