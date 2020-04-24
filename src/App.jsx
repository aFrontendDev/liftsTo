import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Orders/Orders';
import Login from './components/Login/Login';
import Logo from './elements/Logo';
import { isLoggedIn, logout } from './helpers/login.helper';
import styles from "./App.module.scss";

const App = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const userLoggedIn = isLoggedIn();
  
  if (!loggedIn && userLoggedIn) {
    setloggedIn(true);
  }

  const handleLoginSuccess = () => {
    setloggedIn(true);
  }

  const handleLogout = () => {
    logout();
    setloggedIn(false);
  }

  if (!loggedIn) {
    return <Login loginSuccess={handleLoginSuccess} />
  }

  return (
    <Router>
      <div className={styles.layout}>
        <section className={styles.sidebar}>
          <h3 className="visually-hidden">SideBar</h3>
          <div className={styles.logo}>
            <Logo />
          </div>
          <nav className={styles.nav}>
            <h4 className="visually-hidden">Navigation</h4>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </nav>
        </section>

        <section className={styles.main}>
          <h3 className="visually-hidden">Main Content</h3>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="*">
              <Dashboard />
            </Route>
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;
