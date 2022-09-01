use customer_db;

DELIMITER $$
CREATE PROCEDURE customerCodeDetails ()
BEGIN
	DECLARE e_name varchar(40);
    DECLARE e_city varchar(100) DEFAULT "";
    DECLARE e_country varchar(100) DEFAULT "";
	DECLARE e_grade varchar(100) DEFAULT "";
    DECLARE finished INTEGER DEFAULT 0;

	DEClARE employeeDetailsCursor 
		CURSOR FOR 
			SELECT c.CUST_NAME, c.CUST_CITY, c.CUST_COUNTRY, c.GRADE FROM customer c
            where c.AGENT_CODE LIKE 'A00%';

	DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET finished = 1;

	OPEN employeeDetailsCursor;

	getEmployee: LOOP
		FETCH employeeDetailsCursor INTO e_name, e_city, e_country, e_grade;
		IF finished = 1 THEN 
			LEAVE getEmployee;
		END IF;
		select CONCAT(e_name,";",e_city,";",e_country,";",e_grade) as Details;
	END LOOP getEmployee;
	CLOSE employeeDetailsCursor;

END$$
DELIMITER ;

call customerCodeDetails();

DROP PROCEDURE if exists `customerCodeDetails`;