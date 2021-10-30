import React from 'react';
import styles from './SignModal.module.css';

const SignInModal = (props) => {
  
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        <div className={styles.header}>
          <h3 className={styles.title}>Sign In
            {/* <br></br>to get the best results */}
          </h3>
          <img className={styles.closeBtn} 
          src="../../../images/Button/close-btn.svg"
          alt="closeBtn"/>
        </div>
        <div className={styles.authSection}>
          <div className={styles.authBtn}>
            <img src="../../../images/Auth/google-auth-logo.svg" alt="authLogo"/>
            <span className={styles.authText}>Sign in with Google</span>
          </div>
          <div className={styles.authBtn}>
            <img src="../../../images/Auth/facebook-auth-logo.svg" alt="authLogo"/>
            <span className={styles.authText}>Sign in with Facebook</span>
          </div>
          <div className={styles.authBtn}>
            <img src="../../../images/Auth/apple-auth-logo.svg" alt="authLogo"/>
            <span className={styles.authText}>Sign in with Apple</span>
          </div>
          <div className={styles.authBtn}>
            <img src="../../../images/Auth/twitter-auth-logo.svg" alt="authLogo"/>
            <span className={styles.authText}>Sign in with Twitter</span>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <span className={styles.subText}>Don't have an account?</span>
          <span className={styles.signText}>Sign In</span>
        </div>
      </div>
    </section>
  )
}

export default SignInModal;