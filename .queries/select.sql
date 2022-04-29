use restaurant_finder;

select restaurants.name as restaurant, addresses.city as city, types.name AS cuisine
from restaurants
         inner join addresses on restaurants.address_id = addresses.id
         inner join types on restaurants.type_id = types.id;

select reviews.reviewer_name as reviewer,
       reviews.rating        as rating,
       restaurants.name      as restaurant,
       addresses.city        as city,
       types.name            as cuisine
from reviews
         inner join restaurants on reviews.restaurant_id = restaurants.id
         inner join addresses on addresses.id = restaurants.address_id
         inner join types on restaurants.type_id = types.id
where rating > 3;