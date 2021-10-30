import React, { useContext } from 'react';
import { ModalInfoContextStore } from '../../contexts/ModalContext';
import styles from './SignModal.module.css';

const SignUpModal = () => {
  
  const modalInfo = useContext(ModalInfoContextStore);

  return (
    <section className={styles.modalContainer}>
      <div className={styles.signUpModalWrap}>
        <div className={styles.header}>
          <h3 className={styles.title}>Sign Up
            <br></br>to get the best results
          </h3>
          <img className={styles.closeBtn} 
          src="/images/Button/close-btn.svg"
          alt="closeBtn"
          onClick={() => modalInfo.setSignUpModal(false)}/>
        </div>
        <div className={styles.authSection}>
          <div className={styles.authBtn}>
            <img src="/images/Auth/google-auth-logo.svg" alt="authLogo"/>
            <span className={styles.authText}>Sign up with Google</span>
          </div>
          <div className={styles.authBtn}>
            <img src="/images/Auth/facebook-auth-logo.svg" alt="authLogo"/>
            <span className={styles.authText}>Sign up with Facebook</span>
          </div>
          <div className={styles.authBtn}>
            <img src="/images/Auth/apple-auth-logo.svg" alt="authLogo"/>
            <span className={styles.authText}>Sign up with Apple</span>
          </div>
          <div className={styles.authBtn}>
            <img src="/images/Auth/twitter-auth-logo.svg" alt="authLogo"/>
            <span className={styles.authText}>Sign up with Twitter</span>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <span className={styles.subText}>Already have an account?</span>
          <span className={styles.signText}>Sign In</span>
        </div>
        <div className={styles.termsContent}>
          <span>By continuing, you agree to LINER's <span className={styles.termsLink}>Terms of Service</span> and <span className={styles.termsLink}>Privacy Policy</span>.</span>
        </div>
      </div>
    </section>
  )
}

export default SignUpModal;