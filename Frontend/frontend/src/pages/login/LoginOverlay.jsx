import './Login.css'
import { Icon } from "@iconify/react";


function LoginOverlay() {

return (
  
<div className="login-page">

  <div className="blur-overlay"></div>

    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-avatar">
          <Icon icon="lets-icons:user-light" className="login-icon" />
        </div>
        
        <form className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin?.();
          }}
        >
          <div className='input-group'>
            <div className='input-wrapper'>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Gebruikersnaam"
              />
            </div>

            <div className='input-wrapper'>
              <input
              type='password'
                id="password"
                name="password"
                placeholder="Wachtwoord"
              />
            </div>
          </div>

            <button type="submit" className="btn">
              Inloggen
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginOverlay;