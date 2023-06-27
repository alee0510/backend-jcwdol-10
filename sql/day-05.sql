USE sakila;
SHOW TABLES;

-- display first and last name of actor in actor table
SELECT first_name, last_name FROM actor;

-- display fullname of list actor ?
SELECT *, CONCAT(first_name, " ", last_name) AS fullname FROM actor;

-- filter actor data by its firstname
SELECT * FROM actor WHERE first_name = 'PENELOPE';

-- display address data
SELECT * FROM address;

-- filter address data for distric California, Alberta and Mekka
SELECT * FROM address WHERE district IN ('California', 'Alberta', 'Mekka');

-- filter address data by city_id on spesific range
SELECT * FROM address WHERE city_id BETWEEN 300 AND 350;

-- filter actor and show total actor with lastne `WOOD`
SELECT COUNT(*) AS total_actor FROM actor WHERE last_name = 'WOOD';

-- show all customer DATABASE
SELECT * FROM payment;

-- Shows list of customer_id and sum of amount spent that made payment more than 20.
SELECT customer_id, SUM(amount) AS total_amount FROM payment GROUP BY customer_id HAVING total_amount > 20;

SELECT customer_id, COUNT(customer_id) as total_payment, SUM(amount) as total_amount 
FROM payment 
GROUP BY customer_id
HAVING total_payment > 20;

-- Find top 10 actor with the most perform on film.
SELECT actor_id, COUNT(actor_id) AS total_film FROM film_actor GROUP BY actor_id ORDER BY total_film DESC LIMIT 10;

-- Display title, description, length, and rating from film, where special features include deleted scenes and behind the scenes order by most length
SELECT title, description, length, rating, special_features 
FROM film 
WHERE special_features LIKE "%Deleted Scenes%" 
AND special_features LIKE "%Behind the Scenes%" 
ORDER BY length DESC;

-- Display country and total of inactive customer (active = 0) from country where customer active = 0 order by the highest inactive (active = 0) customer
SELECT * FROM customer;
SELECT * FROM address;
SELECT * FROM city;
SELECT * FROM country;

-- JOIN TABLE : inner join
SELECT COUNT(cs.active) AS toal_inactive, cy.country
FROM customer cs
JOIN address ad ON cs.address_id = ad.address_id
JOIN city ct ON ad.city_id = ct.city_id
JOIN country cy ON ct.country_id = cy.country_id
WHERE cs.active = 0
GROUP BY cy.country
ORDER BY toal_inactive DESC;

-- use classicmodels
USE classicmodels;

SELECT * FROM customers;

-- display total customer for eacth city or country
SELECT COUNT(customerNumber) AS total_customer, city 
FROM customers
GROUP BY city
ORDER BY total_customer DESC;

SELECT COUNT(customerNumber) AS total_customer, country 
FROM customers
GROUP BY country
ORDER BY total_customer DESC;

-- display customer and join it order table
SELECT orders.orderNumber, customers.customerName, orders.orderDate, orders.status
FROM orders
JOIN customers ON orders.customerNumber = customers.customerNumber;

-- display data for each customer and total order
SELECT COUNT(orders.orderNumber) AS total_order , customers.customerName
FROM orders
JOIN customers ON orders.customerNumber = customers.customerNumber
GROUP BY customers.customerName
ORDER BY total_order DESC;

-- display total order by its country and sort by the highest total order
SELECT COUNT(orders.orderNumber) AS total_order, customers.country
FROM orders
JOIN customers ON orders.customerNumber = customers.customerNumber
GROUP BY customers.country
ORDER BY total_order DESC;