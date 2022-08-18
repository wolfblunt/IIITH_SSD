#Q1

use company;


select concat(e.Fname, ' ',' ',e.Minit,' ', e.Lname) AS FullName, d1.Mgr_ssn as SSN, d1.Dnumber as DeptID, d1.Dname as DeptName
from department d1
JOIN employee e ON e.Ssn = d1.Mgr_ssn
where e.Ssn in
(select d.Mgr_ssn
from department d
JOIN employee e ON e.Super_ssn = d.Mgr_ssn
where e.Ssn in
(select Essn
from works_on
group by Essn
having sum(Hours)<40));