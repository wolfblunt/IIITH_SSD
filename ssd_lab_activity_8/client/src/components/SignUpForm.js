import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../common.css"
import swal from 'sweetalert';

const BACKEND_URI = "http://localhost:3000/api/";

// functional component
function SignUpForm(props) {
    const [roll, setRoll] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");   
    return (
    <div className="center-div">
        <h1 className='text-center'>Sign Up</h1>
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
            </select>
        </form>
        <button className='btn btn-primary position-relative start-50 translate-middle-x' onClick={async (e) =>  {
                // send fetch (POST) request to server
                const requestOptions = {
                    method : 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body : JSON.stringify({ roll : roll, password : password, role: role })
                };

                var res = await fetch(BACKEND_URI + "register", requestOptions);
                swal((await res.json())["msg"]);
                setRoll("");
                setPassword("");
                setRoll("");
            }}>Sign Up</button>
            <br/>
            <p className='m-4'>Already Registered ? <Link to='/login'> Login Here</Link></p> 
    </div>);
}

export default SignUpForm;