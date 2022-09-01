use customer_db;

DROP PROCEDURE if exists `fetchCustomerDetails`;

DELIMITER $$
CREATE PROCEDURE fetchCustomerDetails (CUST_CITY varchar(100))
BEGIN
	select c.CUST_NAME from customer c where c.WORKING_AREA=CUST_CITY;
END $$
DELIMITER ;

call fetchCustomerDetails('Bangalore');