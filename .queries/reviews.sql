use restaurant_finder;

create table reviews
(
    id            int auto_increment,
    reviewer_name varchar(255)                       not null,
    rating        int                                not null,
    text          text                               null,
    date          datetime default CURRENT_TIMESTAMP not null,
    restaurant_id int                                not null,
    constraint reviews_pk
        primary key (id),
    constraint restaurant_id
        foreign key (restaurant_id) references restaurants (id)
);

create unique index reviews_id_uindex
    on reviews (id);