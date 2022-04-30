create schema blog;

use blog;

create table authors
(
    id    int auto_increment,
    name  varchar(255) not null,
    email varchar(255) null,
    constraint authors_pk
        primary key (id)
);

create unique index authors_id_uindex
    on authors (id);

create table posts
(
    id        int auto_increment,
    title     varchar(255)                       not null,
    summary   varchar(255)                       not null,
    content   text                               not null,
    date      datetime default CURRENT_TIMESTAMP null,
    author_id int                                not null,
    constraint post_pk
        primary key (id),
    constraint author_id
        foreign key (author_id) references authors (id)
);

create unique index post_id_uindex
    on posts (id);

