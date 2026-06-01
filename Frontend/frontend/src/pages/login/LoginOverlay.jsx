import './Login.css'
import { Outlet } from 'react-router-dom';
import Layout from '../../layout/AppLayout';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import { useState } from 'react';
import Dashboard from '../Dashboard';


function Login() {
  const navigate = useNavigate(); // Navigation hook

return (
  
<div className="login-page">
  <div className="background-content">
    <Layout>
      <Dashboard />
    </Layout>
  </div>

  <div className="blur-overlay"></div>

    <div className="login-wrapper">
      <div className="login-box">
        
        <form className="login-form">
          <div className='input-group'>
            <div className='input-wrapper'>
              <label htmlFor="username">Gebruikersnaam</label>
              <input
                type="text"
                id="username"
                name="username"
              />
            </div>

            <div className='input-wrapper'>
              <label htmlFor="password">Wachtwoord</label>
              <input
              type='password'
                id="password"
                name="password"
              />
            </div>
          </div>

            <button type="submit" className="btn login-btn">
              Inloggen
            </button>
        </form>
      </div>
      
    </div>
    </div>
  )
}

export default Login;