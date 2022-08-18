#Q4

use company;

select d1.Dnumber as DeptID, d1.Dname as DeptName, count(l.dnumber) NoOfLocations
from department d1
JOIN dept_locations l ON d1.Dnumber = l.Dnumber
where d1.Mgr_ssn in
(select d.Essn
from dependent d
where Sex="F"
group by d.Essn
having count(d.Essn)>1)
group by l.Dnumber;