import './Login.css'
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";


function LoginOverlay({onClose}) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    navigate("/instellingen/tarieven");
    
  };

return (
  
<div className="login-page">

  <div className="blur-overlay" onClick={onClose}/>

    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-avatar">
          <Icon icon="lets-icons:user-light" className="login-icon" />
        </div>

        <button
            type="button"
            className="back-btn"
            onClick={onClose}
          >
            <Icon icon="mdi-light:arrow-left"/>
          </button>
        
        <form className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className='content-group'>
            <div className='input-wrapper'>
              <Icon icon="gridicons:user" className="input-icon"/>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Gebruikersnaam"
              />
            </div>

            <div className='input-wrapper'>
              <Icon icon="si:lock-fill" className="input-icon"/>
              <input
              type='password'
                id="password"
                name="password"
                placeholder="Wachtwoord"
              />
            </div>
            <button type="submit" className="btn">
              Inloggen
            </button>
          </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginOverlay;