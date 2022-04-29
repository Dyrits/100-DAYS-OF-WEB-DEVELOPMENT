use restaurant_finder;

create table restaurants
(
    id         int auto_increment,
    name       varchar(255) not null,
    address_id int          not null,
    type_id    int          not null,
    constraint restaurants_pk
        primary key (id),
    constraint address_id
        foreign key (address_id) references addresses (id),
    constraint type_id
        foreign key (type_id) references types (id)
);

create unique index restaurants_id_uindex
    on restaurants (id);

