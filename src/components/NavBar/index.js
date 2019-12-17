import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const NavBar = () => (
  <div className={styles.navbar}>
    <nav className="container">
      <ul className={styles.menu}>
        <li className={styles.item}>
          <NavLink exact to="/" activeClassName={styles.active}>
            Home
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/settings" activeClassName={styles.active}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
);

export default NavBar;
