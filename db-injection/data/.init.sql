CREATE DATABASE security;

create table comments
(
    id     int auto_increment,
    author varchar(255) not null,
    text   text         not null,
    constraint comments_pk
        primary key (id)
);

create unique index comments_id_uindex
    on comments (id);
