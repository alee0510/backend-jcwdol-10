USE classicmodels;

SELECT * FROM customers;
SELECT * FROM orders;

-- PR : 
-- display total order by its customer with status shipped and sort by the highest total order
-- display employee name and its total customers
-- display employee and the total order sorted by the highest total order

-- display all total order by its country and sort by the highest total order

SELECT country FROM customers GROUP BY country;

SELECT customers.customerName, COUNT(customers.customerName) as total_order
FROM customers
JOIN orders ON customers.customerNumber = orders.customerNumber
WHERE orders.status = "Shipped"
GROUP BY customers.customerName
ORDER BY total_order DESC;