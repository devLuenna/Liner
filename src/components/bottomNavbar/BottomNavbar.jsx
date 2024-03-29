import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { ModalInfoContextStore } from '../../contexts/ModalContext';
import styles from './BottomNavbar.module.css';

const BottomNavbar = (props) => {

  const history = useHistory();
  const [moreOpt, setMoreOpt] = useState(false);
  const modalInfo = useContext(ModalInfoContextStore);

  const goHomepage = () => { //로고 클릭 시 라이너 공홈으로 이동
    window.location.href = "https://getliner.com/"
  }

  const goSearchpage = () => { 
    history.push('/search');
  }

  const handleSignIn = () => {
    modalInfo.setSignInModal(true);
    setMoreOpt(false);
  }
  const handleSignUp = () => {
    modalInfo.setSignUpModal(true);
    setMoreOpt(false);
  }

  return (
    <section className={styles.container}>
      <div className={styles.btns}>
        <div>
          <img className={styles.btn} src="/images/Button/home.jpg" alt="homeBtn"
          onClick={goHomepage}/>
        </div>
        <div>
          <img className={styles.btn} src="/images/Button/search.jpg" alt="searchBtn"
          onClick={goSearchpage}/>
        </div>
        <div className={styles.moreBtnBox}>
          <img className={styles.btn} src="/images/Button/more.jpg" alt="moreBtn"
          onClick={() => setMoreOpt(!moreOpt)}/>
          {moreOpt ? 
          <div className={styles.moreOpt}>
            <span className={styles.signIn} onClick={handleSignIn}>Sign In</span>
            <span className={styles.signUp} onClick={handleSignUp}>Sign Up</span>
          </div> : null}
        </div>
      </div>
    </section>
  )
}

export default BottomNavbar;