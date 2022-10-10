import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from 'sweetalert';

const BACKEND_URI = "http://localhost:3000/std/";

function AddQuery(props) {
  // const roll = sessionStorage.getItem("curr_email");
  const roll = sessionStorage.getItem("curr_email");
  const [course_name, setCourseName] = useState([]);

  const [exam_name, setExamName] = useState("");
  const [question_num, setQuestionNum] = useState("");
  const [ta_roll, setTARoll] = useState("");
  const [std_comment, setStdComment] = useState("");

  // useEffect(() => {
  //   var res1 = async () => {
  //       const requestOptions = {
  //         credentials: "include",
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       };
  //       // console.log("role: ", role);
  //       var url = BACKEND_URI + "showQuery/" + roll;
  //       const response = await fetch(url, requestOptions);
  //       if (response) {

  //         // sessionStorage.removeItem("curr_email");
  //         var jsonResponse = await response.json();
  //         console.log("res: ", jsonResponse);
  //           setStudentDetails(jsonResponse.data)
  //           console.log("studentDetails : ",studentDetails);
  //           console.log(typeof studentDetails);
  //       }
  //     };
  //     res1();
  // }, []);

  // const img_link = "https://i.ibb.co/0mR0RTc/user.jpg";

  // const data = [
  //   ["key1", "value1"],
  //   ["key2", "value2"],
  //   ["key3", "value3"],
  // ];

  // const tableStyle = {
  //   width: "fit-content",
  //   margin: "auto",
  //   border: "1px solid black",
  // };

  const navigate = useNavigate();


  // const navigateToLogin = () => {
  //   navigate("/login");
  // };

  const navigateStudentQuery = () => {
    var path= "/student";
    console.log("path :",path);
    navigate(path);
  };

  // If email is null it means the session variable is not set and hence the user
  // has not logged in yet
  console.log("ROLL :",roll);
  // if (roll == null) {
  //   return (
  //     <p>
  //       Please Login First.
  //       <button onClick={navigateToLogin} className="btn btn-primary">
  //         Go To Login
  //       </button>
  //     </p>
  //   );
  // }

  // control comes here if email is not null.
  return (
    <div>
    <form className='form-group'>
            <label className='m-2 form-label'>Exam Name : </label>
            <br/>
            <input className='m-2 form-control' type="text" name="exam_name" value={exam_name} onChange={(e) => setExamName(e.target.value)}/>
            <br/>
            <label className='m-2 form-label'>Course Name : </label>
            <br/>
            <input className='m-2 form-control' type="text" name="course_name" value={course_name} onChange={(e) => setCourseName(e.target.value)}/>
            <br/> 
            <label className='m-2 form-label'>Question No. : </label>
            <br/>   
            <input className='m-2 form-control' type="text" name="question_num" value={question_num} onChange={(e) => setQuestionNum(e.target.value)}/> 
            <br /> 
            <label className='m-2 form-label'>TA's RollNo : </label>
            <br/>   
            <input className='m-2 form-control' type="text" name="ta_roll" value={ta_roll} onChange={(e) => setTARoll(e.target.value)}/>
            <label className='m-2 form-label'>Comments : </label>
            <br/>   
            <textarea className='m-2 form-control' type="text" name="std_comment" value={std_comment} onChange={(e) => setStdComment(e.target.value)}/> 
    </form>

    <button className='btn btn-primary position-relative start-50 translate-middle-x' onClick={async (e) =>  {
                // send fetch (POST) request to server
      const requestOptions = {
          credentials : 'include',
          method : 'POST',
          headers: {'Content-Type': 'application/json'},
          body : JSON.stringify({ exam_name : exam_name, course_name : course_name, question_num: question_num, ta_roll:ta_roll, std_comment:std_comment, roll:roll })
      };
      // console.log("role: ",role)
      var res = await fetch(BACKEND_URI + "addQuery", requestOptions);
      swal((await res.json())["data"]);
      setExamName("");
      setCourseName("");
      setQuestionNum("");
      setTARoll("");
      setStdComment("");
      if(res.status == 200) {
      sessionStorage.setItem("curr_email", roll);
      navigateStudentQuery();
      }
      }}>POST
    </button>

    <button className='btn btn-primary m-4' onClick={async (e) =>  {
                const requestOptions = {
                    credentials : 'include',
                    method : 'GET',
                    headers: {'Content-Type': 'application/json' }
                };
                sessionStorage.setItem("curr_email", roll);
                navigateStudentQuery();
                // var res = await fetch("http://localhost:3006/student", requestOptions);
                {/* alert((await res.json())["msg"]); */}

                // if(res.status == 200) {
                //     sessionStorage.removeItem("curr_email");
                //     navigateToLogin();
                // }
            }}>Back</button>

    {/* <br/>
      <h2 className="text-center"> Welcome, {roll} </h2>
      <h2> Feedback </h2>
      <div className="text-center">
        <table style={tableStyle}>
          {studentDetails.map(row => (
            <tr key={row[0]}>
              <td style={{ border: "1px solid black" }}>
                <div>Exam Name : {row.exam_name} </div>
                <div>Course Name : {row.course_name}</div>
                <div>Question No : {row.question_num}</div>
                <div>TA's Roll : {row.ta_roll}</div>
                <div>Your Comment : {row.std_comment}</div>
                <div>TA's Response : {row.ta_comment}</div>
            </td>
            </tr>
        ))}
        </table>
      </div> */}
    </div>)
}

export default AddQuery;
