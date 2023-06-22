USE JCWDOL;

-- DROP TABLE IF EXISTS `users`;

-- CREATE TABLE `users` (
--   `id` mediumint(8) unsigned NOT NULL auto_increment,
--   `name` varchar(255) default NULL,
--   `address` varchar(255) default NULL,
--   `city` varchar(255),
--   `phone` varchar(100) default NULL,
--   `email` varchar(255) default NULL,
--   PRIMARY KEY (`id`)
-- ) AUTO_INCREMENT=1;users

-- INSERT INTO `users` (`name`,`address`,`city`,`phone`,`email`)
-- VALUES
--   ("Emily Gamble","935-5691 Non Road","Palembang","1-701-845-4434","lorem@outlook.org"),
--   ("Beatrice Decker","Ap #738-2158 Augue St.","Denpasar","1-131-944-2362","porttitor@protonmail.edu"),
--   ("Kasimir Everett","Ap #455-6444 Ut St.","Serang","1-463-760-2818","vel@outlook.org"),
--   ("Xavier Fisher","Ap #268-4633 Scelerisque, Ave","Parepare","1-882-462-0531","lacinia.orci@aol.ca"),
--   ("Nero Oliver","Ap #250-649 Ipsum. Rd.","Tanjung Pinang","1-563-791-7073","facilisis@aol.couk");


-- GET DATA OR QUERY DATA
SELECT * FROM users; 

-- GET SPESIFIC FIELD OR COL
SELECT id, address, city, phone FROM users;

-- GET ONLY UNIQUE VALUE
SELECT DISTINCT id, name, address, city, phone FROM users;

-- CRUD OPERATION IN SQL
-- CREATE OR INSERT A DATA
INSERT INTO users (name, address,city, phone, email)
values ("alee0510", "BSD no 61-2", "Banten", "6212345678", "alee0510");

-- UPDATE DATA
UPDATE users SET name="alee", city="Tanggerang" WHERE id=56;

-- DELETE
DELETE FROM users WHERE id=58;

-- ORDER or SORTING
SELECT * FROM users ORDER BY name ASC;

-- FILTER DATA WITH WHERE AND SINGLE CONDITION
SELECT * FROM users WHERE city="jakarta";

-- FILTER DATA WITH WHERE WITH COMPARISON (AND, OR)
SELECT * FROM users WHERE city="palembang" AND phone="1-701-845-4434";
SELECT * FROM users WHERE city="palembang" OR phone="1-701-845-4434";

-- FILTER DATA WITH WHERE IN or NOTIN SOME VALUES
SELECT * FROM users WHERE city IN ("jakarta", "palembang");
SELECT * FROM users WHERE city IN ("jakarta", "palembang") AND phone="1-701-845-4434";
SELECT * FROM users WHERE city NOT IN ("jakarta", "palembang");

-- FILTER DATA IN RANGE VALUE USING BETWEEN
SELECT * FROM users WHERE id >= 10 AND id <= 20;
SELECT * FROM users WHERE id BETWEEN 10 AND 20;

-- FILTER DATA USING LIKE TO GIVE MATCH CONDITON OF CERTAING STRING IN THE values
SELECT * FROM users WHERE name LIKE "a%";
SELECT * FROM users WHERE name LIKE "%n";
SELECT * FROM users WHERE name LIKE "%on%";
SELECT * FROM users WHERE name LIKE "a%n";
SELECT * FROM users WHERE name LIKE "a__e";

-- SEARCH FOR NULL OR NON NULL VALUE
SELECT * FROM users WHERE name IS NULL;
SELECT * FROM users WHERE name IS NOT NULL;

-- SLELECT DATA WITH LIMIT
SELECT * FROM users;
SELECT * FROM users LIMIT 10;

-- GET 20 DATA USERS WITH ID MORE THAN 20, KOTA PALEMBANA, DENPASAR, KEDIRI, AND THE NAME START WITH "b"








