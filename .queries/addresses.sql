create table addresses
(
    id            int auto_increment,
    street        varchar(255) not null,
    street_number varchar(25)  not null,
    city          varchar(255) not null,
    postal_code   int          not null,
    country       varchar(255) null,
    constraint addresses_pk
    primary key (id)
);

create unique index addresses_id_uindex on addresses (id);

