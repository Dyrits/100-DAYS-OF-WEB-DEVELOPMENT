use restaurant_finder;

create table types
(
    id   int auto_increment,
    name varchar(255) not null,
    constraint types_pk
        primary key (id)
);

create unique index types_id_uindex
    on types (id);

