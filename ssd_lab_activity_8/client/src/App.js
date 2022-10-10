import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import Student from './components/Student';
import AddQuery from './components/AddQuery';
import Ta from './components/Ta';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="signup" element={<SignUpForm />}/>
        <Route path="login" element={<LoginForm />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="student" element={<Student />}/>
        <Route path="ta" element={<Ta />}/>
        <Route path="addQuery" element={<AddQuery />}/>
    </Routes>
  </BrowserRouter>);
}

export default App;
