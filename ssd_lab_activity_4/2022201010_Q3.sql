use customer_db;
DROP PROCEDURE if exists `fetchCustomerAccountInfo`;

DELIMITER $$
CREATE PROCEDURE fetchCustomerAccountInfo ()
BEGIN
	select c.CUST_NAME, c.GRADE from customer c
    where (c.OPENING_AMT + c.RECEIVE_AMT) > 10000 ;
END $$
DELIMITER ;

call fetchCustomerAccountInfo();