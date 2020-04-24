import React, { useState, useEffect } from "react";
import { setLocalStorage, clearLocalStorage } from '../../helpers/localStorge.helper';
import Logo from '../../elements/Logo';
import styles from "./Login.module.scss";

const Login = props => {
  const { loginSuccess } = props || {};
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleError = data => {
    const { msg } = data || {};
    setError(msg);
  }

  const handleSuccess = data => {
    const { access_token, refresh_token } = data || {};
    setError(null);
    clearLocalStorage();
    const currentDate = new Date();
    const expAccess = currentDate.getTime() + (15 * 60000); // 15mins from now
    const expRefresh = currentDate.setDate(currentDate.getDate() + 30); // 30 days from now
    setLocalStorage({key: 'access', val: access_token});
    setLocalStorage({key: 'refresh', val: refresh_token});
    setLocalStorage({key: 'accessExp', val: expAccess});
    setLocalStorage({key: 'refreshExp', val: expRefresh});
    
    if (loginSuccess && typeof loginSuccess === 'function') {
      loginSuccess();
    }
  }

  const callLogin = ({user, pass}) => {
    let error = false;

    fetch('https://freddy.codesubmit.io/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    })
    .then(res => {
      const { status } = res || {};
      if (status < 200 || status >= 300) {
        error = true;
      }

      return res.json();
    })
    .then(json => {
      if (error) {
        handleError(json)
      } else {
        handleSuccess(json);
      }
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (username && password) {
      callLogin({user: username, pass: password});
    }
  }

  const inputChange = (event, type) => {
    const { target } = event || {};
    const { value } = target || {};

    if (type === 'user') {
      setUsername(value);
    }

    if (type === 'pass') {
      setPassword(value);
    }
  }

  return (
    <section className={styles.wrapper} onSubmit={e => {handleSubmit(e)}}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.titleWrap}><h1 className={styles.title}>Freddy's Artisanal Halloween Candy Shop</h1></div>
          <div className={styles.logo}><Logo /></div>
        </header>
        <div className={styles.body}>
          <form className={styles.form}>
            <fieldset className="fieldset fieldset--vertical">
              <label className="label" htmlFor="loginUser">Enter username:</label>
              <input type="text" id="loginUser" name="loginUser" placeholder="username123" required onChange={e => {inputChange(e, 'user')}} />
            </fieldset>

            <fieldset className="fieldset fieldset--vertical">
              <label className="label" htmlFor="loginPass">Enter password:</label>
              <input type="password" id="loginPass" name="loginPass" required onChange={e => {inputChange(e, 'pass')}}/>
            </fieldset>

            {error && (
              <div className={styles.error}>
                <p>{error}</p>
              </div>
            )}

            <div className={styles.actions}>
              <button className="btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
