import React, { useState, useEffect } from 'react';
import './css/Login.css';
import { LOGIN_API } from './api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [adminMobile, setAdminMobile] = useState("");
  const [password, setPassword] = useState("");
  const [adminPassword,setAdminPassword] = useState("");
  const [message, setMessage] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${LOGIN_API}/${mobile}/${password}`;
      const response = await axios.get(url);
      if (response.data.rc === '00') {
        localStorage.setItem('userMobile', mobile);
        navigate('/home');
      } else if (response.data.rc === '01') {
        setMessage('Invalid Password');
        alert('Invalid Password');
      } else if (response.data.rc === '02') {
        setMessage('Invalid Mobile number');
        alert("Invalid Mobile number");
      }
    } catch (e) {
      setMessage("Something went wrong");
      alert("Something went wrong");
    }
  };
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${LOGIN_API}/${adminMobile}/${adminPassword}`;
      const response = await axios.get(url);
      if (response.data.rc === '00') {
        localStorage.setItem('adminMobile', mobile);
        navigate('/admin');
      } else if (response.data.rc === '01') {
        setAdminMessage('Invalid Password');
        alert('Invalid Password');
      } else if (response.data.rc === '02') {
        setAdminMessage('Invalid Mobile number');
        alert("Invalid Mobile number");
      }
    } catch (e) {
      setAdminMessage("Something went wrong");
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleAdminSubmit}>
            <h1>Admin</h1>
            <input 
            type="text" 
            placeholder="Mobile number"
            value = {adminMobile}
            onChange={(e)=> setAdminMobile(e.target.value)}
            required
             />
            <input
              type="password"
              placeholder="Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
            {adminMessage && <p className="error-message">{adminMessage}</p>}
            <button>Sign in</button>
          </form>
        </div>




        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <input
              type="text"
              placeholder="Mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {message && <p className="error-message">{message}</p>}
            <button type="submit">Sign In</button>
          </form>
        </div>



        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Admin!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn">Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, User</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp">Admin</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
