import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from 'sweetalert';

const BACKEND_URI = "http://localhost:3000/std/";

function Student(props) {
  const roll = sessionStorage.getItem("curr_email");
  const [studentDetails, setStudentDetails] = useState([]);
  useEffect(() => {
    var res1 = async () => {
        const requestOptions = {
          credentials: "include",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        // console.log("role: ", role);
        var url = BACKEND_URI + "showQuery/" + roll;
        const response = await fetch(url, requestOptions);
        if (response) {

          // sessionStorage.removeItem("curr_email");
          var jsonResponse = await response.json();
          console.log("res: ", jsonResponse);
            setStudentDetails(jsonResponse.data)
            console.log("studentDetails : ",studentDetails);
            console.log(typeof studentDetails);
            sessionStorage.setItem("curr_email", roll);
            // navigateToStudentQuery();
        }
      };
      res1();
  }, []);

  const img_link = "https://i.ibb.co/0mR0RTc/user.jpg";

  const data = [
    ["key1", "value1"],
    ["key2", "value2"],
    ["key3", "value3"],
  ];

  const tableStyle = {
    width: "fit-content",
    margin: "auto",
    width: "100%",
    border: "1px solid black",
    // borderCollapse:"separate",
    // borderSpacing:"0 20px",
  };

  const tableStyle1 = {
    width: "fit-content",
    margin: "auto",
    width: "100%",
    // border: "1px solid black",
    borderCollapse:"separate",
    borderSpacing:"0 20px",
  };

  const logoutdiv = {
    display: "inline-flex"
  }

  const loclass = {
    position: "absolute",
    right: "0",
  }

  const tdborder = {
    // border: "1px solid black",
    width: "400px"
  }

  const tdborder1 = {
    // border: "1px solid black",
    width: "600px"
  }

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToQueryForm = () => {
    sessionStorage.setItem("curr_email", roll);
    var navPath = "/addQuery/";
    navigate(navPath);
  }

  // If email is null it means the session variable is not set and hence the user
  // has not logged in yet
  if (roll == null) {
    return (
      <p>
        Please Login First.
        <button onClick={navigateToLogin} className="btn btn-primary">
          Go To Login
        </button>
      </p>
    );
  }

  // control comes here if email is not null.
  return (
    <div>
      <div>
        <div style={logoutdiv}>
      <div><button
        className="btn btn-primary m-4"
        onClick={navigateToQueryForm}
            // async (e) => 
        // {
        //   const requestOptions = {
        //     credentials: "include",
        //     method: "GET",
        //     headers: { "Content-Type": "application/json" },
        //   };
        //   var res = await fetch(BACKEND_URI + "addQuery", requestOptions);
        //   {
        //     /* alert((await res.json())["msg"]); */
        //   }

        //   if (res.status == 200) {
        //     sessionStorage.removeItem("curr_email");
        //     navigateToLogin();
        //   }
        // }
    // }
    >
        Add New Query
      </button></div>
      <div style={loclass}><button className='btn btn-primary m-4' onClick={async (e) =>  {
                const requestOptions = {
                    credentials : 'include',
                    method : 'GET',
                    headers: {'Content-Type': 'application/json' }
                };
                var res = await fetch("http://localhost:3000/api/logout", requestOptions);
                {/* alert((await res.json())["msg"]); */}

                if(res.status == 200) {
                    sessionStorage.removeItem("curr_email");
                    navigateToLogin();
                }
            }}>Logout</button></div></div></div>
      <h2 className="text-center"> Welcome, {roll} </h2>
      <h2> Feedback </h2>
      <div>
        {/* <img className="img-thumbnail w-25 h-25 m-4" src={img_link} alt="" /> */}
        <table style={tableStyle1}>
          {studentDetails.map(row => (
            <tr key={row[0]}>
              <td>
                <table style={tableStyle}>
                <tr><td style={tdborder}>Exam Name : </td><td style={tdborder1}>{row.exam_name} </td></tr>
                <tr><td style={tdborder}>Course Name : </td><td style={tdborder1}>{row.course_name}</td></tr>
                <tr><td style={tdborder}>Question No : </td><td style={tdborder1}>{row.question_num}</td></tr>
                <tr><td style={tdborder}>TA's Roll : </td><td style={tdborder1}>{row.ta_roll}</td></tr>
                <tr><td style={tdborder}>Your Comment : </td><td style={tdborder1}>{row.std_comment}</td></tr>
                <tr><td style={tdborder}>TA's Response : </td><td style={tdborder1}>{row.ta_comment}</td></tr>
                
                </table>
            </td>
            </tr>
        ))}
        </table>
      </div>
    </div>)
}

export default Student;
