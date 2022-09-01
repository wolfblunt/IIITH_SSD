DELIMITER $$
CREATE PROCEDURE addTwoNumbers (
	num1 INT,
    num2 INT,
    OUT result INT
)
BEGIN
	SET result = num1 + num2;
END $$
DELIMITER ;

SET @result=0;
call addTwoNumbers(5,6,@result);
select @result; 

DROP PROCEDURE if exists `addTwoNumbers`;