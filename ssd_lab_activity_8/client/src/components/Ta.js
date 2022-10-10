import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from 'sweetalert';

const BACKEND_URI = "http://localhost:3000/ta/";

function Ta(props) {
  // const [comm, setComm] = useState([]);
  const roll = sessionStorage.getItem("curr_email");
  const [studentDetails, setStudentDetails] = useState([]);
  const [comm, setComm] = useState([]);
  
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
    border: "0px solid black",
    borderStyle: "none",
  };

  const maintd = {
    margin: "25px",
    columnGap: "40px",
    rowGap: "40px",
  }

  const tableStyle1 = {
    // width: "fit-content",
    margin: "auto",
    width: "100%",
    border: "0px solid black",
    borderStyle: "none",
    margin: "5px",
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

  const result =  {
    width: "50%",
    display: "flex",
    justifyContent: "right",
}

const tdborder = {
  border: "0px solid black",
  width: "400px"
}

const tdborder1 = {
  border: "0px solid black",
  width: "600px"
}

  function taEdit()
  {
    var maker="Maker";
    if (role === maker) //  equal value and equal type
    {
        $("#CMCNA2").attr("readonly", true);

    } else {$("#CMCNA2").attr("readonly", false);}
  }

  // const divStyle = {
  //   width : "70px"
  // }

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToQueryForm = () => {
    var navPath = "/ta";
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
  // let comm="";
  function isReadOnly(row)
  {
    console.log("row.IsActive : ",row.IsActive)
    if(row.IsActive)
    {
        // let data = <input type="text" name="CMCNA1" id="CMCNA1" pattern="[A-Za-z]+" title="Please insert your comment" />
        let data = <textarea name="CMCNA1" id="CMCNA1" pattern="[A-Za-z]+" title="Please insert your comment" value={comm} onChange={(e) => setComm(e.target.value)}></textarea>
        return data;
    }
    else{
      let data = row.ta_comment;
      return data;
    }
  }


  function isCommentCheck(IsActive,stdroll,ta_roll,exam_name,course_name,question_num)
  {
    // if(document.getElementById("CMCNA1").value.length !=0){
    // comm = document.getElementById("CMCNA1").innerText;}
    console.log("Inside isCommentCheck : ",IsActive);
    console.log("comm isCommentCheck : ",comm);
    if(IsActive)
    {
      return (<button className='btn btn-primary position-relative start-50 translate-middle-x' onClick={async (e) =>  {
        // send fetch (POST) request to server
        var requestOptions1;
        // comm = "A splay tree is a binary search tree with the additional property that recently accessed elements are quick to access again";
        requestOptions1 = {
            credentials : 'include',
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({ roll: stdroll ,ta_comment : comm, ta_roll : ta_roll, exam_name: exam_name, course_name: course_name, question_num: question_num})
        };

        // console.log("role: ",role)
        var res1 = await fetch(BACKEND_URI + "updateQuery", requestOptions1);
        swal((await res1.json())["data"]);
          if(res1.status == 200) {
              sessionStorage.setItem("curr_email", roll);
              // navigateToQueryForm();
              window.location.reload();
          }
        }}>Post Comment</button>)
    }
  }



  // control comes here if email is not null.
  return (
    <div>
      <h2 className="text-center"> Welcome, {roll} </h2>
      <div style={logoutdiv}>
      <div><h2> Students' Concerns (For TA) </h2></div>
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
            }}>Logout</button></div></div>
      <div>
        {/* <img className="img-thumbnail w-25 h-25 m-4" src={img_link} alt="" /> */}
        <br /><br />
        <table style={tableStyle1}>
          {studentDetails.map(row => (
            <tr key={row[0]} style={maintd}>
              <td style={{ border: "1px solid black" }}>
                <table  style={tableStyle}>
                <tr><td style={tdborder}>Exam Name :</td><td style={tdborder1}>{row.exam_name} </td></tr>
                <tr><td style={tdborder}>Course Name : </td><td style={tdborder1}>{row.course_name}</td></tr>
                <tr><td style={tdborder}>Question No : </td><td style={tdborder1}>{row.question_num}</td></tr>
                <tr><td style={tdborder}>TA's Roll : </td><td style={tdborder1}>{row.ta_roll}</td></tr>
                <tr><td style={tdborder}>Your Comment : </td><td style={tdborder1}>{row.std_comment}</td></tr>
                {/* <div>TA's Response : {row.ta_comment}</div> */}
                <tr><td style={tdborder}>TA's Response : </td><td style={tdborder1}> {isReadOnly(row)} </td></tr>
                
                <tr><td colspan="2">{isCommentCheck(row.IsActive,row.roll,row.ta_roll,row.exam_name,row.course_name,row.question_num)}</td></tr>
                </table>
            </td>
            </tr>
        ))}
        </table>
      </div>
    </div>)
}

export default Ta;
