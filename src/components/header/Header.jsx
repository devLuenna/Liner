import React from 'react';
import styles from './Header.module.css';

const Header = (props) => {

  const goHomepage = () => {
    window.location.href = "https://getliner.com/"
  }
  
  return (
    <header className={styles.container}>
      <div className={styles.logoBox}>
        <img className={styles.logo} src="../../../images/Logo/liner-logo.svg" alt="linerLogo" onClick={goHomepage}/>
      </div>
      <div className={styles.inputBox}>
        <input className={styles.inputSearch} type="text" placeholder="Search on LINER"/>
        <img className={styles.searchBtn} src="../../../images/Button/search-finder-btn.svg" alt="searchBtn"/>
      </div>
      <div className={styles.btns}>
        <span className={styles.signInBtn}>Sign In</span>
        <span className={styles.signUpBtn}>Sign Up</span>
      </div>
    </header>
  )
}

export default Header;