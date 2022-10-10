import "../common.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const BACKEND_URI = "http://localhost:3000/api/";

// functional component
function LoginForm(props) {
    const [roll, setRoll] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate('/profile');
    }

    const navigateToStudentQuery = () => {
        navigate('/student');
    }

    const navigateToTAQueryResolve = () => {
        navigate('/ta');
    }

    return (
    <div className="center-div">
        <h1 className='text-center'>Login</h1>
        <form className='form-group'>
            <label className='m-2 form-label'>Roll No : </label>
            <br/>
            <input className='m-2 form-control' type="text" name="roll" value={roll} onChange={(e) => setRoll(e.target.value)}/>
            <br/>
            <label className='m-2 form-label'>Password : </label>
            <br/>
            <input className='m-2 form-control' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br/> 
            <label className='m-2 form-label'>Role : </label>
            <br/>
            <select className="m-2 form-select" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="default">Please select something</option>
                <option value="student">Student</option>
                <option value="ta">TA</option>
            </select>
            {/* <input className='m-2 form-control' type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)}/>     */}
        </form>
        <button className='btn btn-primary position-relative start-50 translate-middle-x' onClick={async (e) =>  {
                // send fetch (POST) request to server
                var requestOptions;
                var rolePath;
                if(role=="student"){
                    requestOptions = {
                        credentials : 'include',
                        method : 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body : JSON.stringify({ roll : roll, password : password, role: role })
                    };
                    rolePath = "login";
                }

                else{
                    requestOptions = {
                        credentials : 'include',
                        method : 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body : JSON.stringify({ roll : roll, password : password, role: role })
                    };
                    rolePath = "login";
                }

                console.log("role: ",role)
                var res = await fetch(BACKEND_URI + rolePath, requestOptions);
                swal((await res.json())["msg"]);
                setRoll("");
                setPassword("");
                setRoll("");
                if(res.status == 200) {
                    sessionStorage.setItem("curr_email", roll);
                    if(role=="student"){
                        navigateToStudentQuery();
                    }
                    else{
                        navigateToTAQueryResolve();
                    }
                }
            }}>Login</button>
            <br/>
            <p className='m-4'>Do not have an account ? <Link to='/signup'> Sign Up Here</Link> </p> 
    </div>);
}

export default LoginForm;