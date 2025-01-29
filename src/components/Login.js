import React, { useState } from 'react';
import './css/Login.css';
import { LOGIN_API } from './api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [mobile,setMobile] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage]=useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${LOGIN_API}/${mobile}/${password}`;
      const response = await axios.get(url);
      console.log(response);
      if(response.data.rc==='00'){
        localStorage.setItem('userMobile',mobile);
        navigate('/home');    
      }
      else if(response.data.rc==='01'){
        setMessage('Invalid Password');
        alert('Invalid Password');
      }
      else if(response.data.rc==='02'){
        setMessage('Invalid Mobile number');
        alert("Invalid Mobile number");
      }
    }
    catch (e) {
      setMessage("Something went wrong");
      alert(message);
    }
}
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sign in</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="mobile">Mobile number</label>
            <input
              type="text"
              id="mobile"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && <p className="error-message">{message}</p>}

          <button type="submit" className="signin-button">
            Sign in
          </button>
        </form>

        <p className="create-account">
          Don't have an account? <a href="/create-account">Create account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;