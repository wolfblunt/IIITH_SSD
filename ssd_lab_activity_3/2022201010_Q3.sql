#Q3.

use company;

select w.Essn as ManagerSSN, count(w.Essn) NumberOfProjects
from works_on w
where w.Essn in 
(select d.Mgr_ssn
from department d
where d.Dnumber in
(select p.Dnum
from project p
where p.Pname='ProductY'))
group by w.Essn;