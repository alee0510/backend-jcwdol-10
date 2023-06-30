USE sakila;

SELECT * FROM country
WHERE country IN ('China', 'Bangladesh', 'India');

SELECT * FROM actor
WHERE last_name LIKE '%OD%'
ORDER BY last_name, first_name;

SELECT last_name, COUNT(*) AS total 
FROM actor
GROUP BY last_name
HAVING total > 1;

SELECT CONCAT(first_name, " ", last_name) as name, first_name, last_name, address.address
FROM staff
JOIN address ON address.address_id = staff.address_id;

SELECT * FROM film;

