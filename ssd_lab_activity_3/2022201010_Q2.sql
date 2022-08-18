# Q2

use company;

select concat(e.Fname, ' ',' ',e.Minit,' ', e.Lname) AS FullName, e.Ssn, e.Dno as DeptID, count(e.Fname) NumberOfEmployees
from employee e
Join employee e2 ON e.Ssn=e2.Super_ssn
group by e.Fname;