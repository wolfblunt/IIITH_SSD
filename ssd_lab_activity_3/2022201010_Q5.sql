# Q5

use company;

select d.Mgr_ssn as ManagerSSN, d.Dnumber as DeptID, count(dp.Essn) NumberOfDependents
from department d
JOIN dependent dp ON dp.Essn=d.Mgr_ssn
where d.Dnumber in
(select l.Dnumber
from dept_locations l
group by l.Dnumber
having count(l.Dnumber)>1)
group by dp.Essn;