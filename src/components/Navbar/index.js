/* eslint complexity: 0 */

import React, {useState} from 'react';
import logo from '#src/logo.svg';
import logoWhite from '#src/logo.svg';
import styles from './index.scss';

const Navbar = ()=> {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={
          open ? `${styles.overlay} ${styles.overlayOpen}` : styles.overlay
        }
      >
        <div className={styles.overlayContent}>
          <a>About</a>
          <a>Services</a>
          <a>Get Quote</a>
          <a>Contact</a>
        </div>
      </div>
      <div
        className={
          open
            ? `${styles.container} ${styles.containerOpen}`
            : styles.container
        }
      >
        <div className={styles.logo}>
          <img
            className={open ? styles.image : undefined}
            src={open ? logoWhite : logo}
            width="130"
          />
        </div>
        <nav className={open ? `${styles.nav} ${styles.navOpen}` : styles.nav}>
          <ul>
            <li>Login</li>
            <li>
              <button
                className={
                  open ? `${styles.button} ${styles.buttonOpen}` : styles.button
                }
              >
                Sign Up
              </button>
            </li>
            <li onClick={()=> setOpen(!open)}>
              <div className={open ? styles.one : undefined}></div>
              <div className={open ? styles.two : undefined}></div>
              <div className={open ? styles.three : undefined}></div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
