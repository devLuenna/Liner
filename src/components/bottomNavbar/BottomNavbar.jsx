import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from './BottomNavbar.module.css';

const BottomNavbar = (props) => {

  const history = useHistory();
  const [moreOpt, setMoreOpt] = useState(false);

  const goHomepage = () => { 
    window.location.href = "https://getliner.com/"
  }

  const goSearchpage = () => { 
    history.push('/search');
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
            <span className={styles.signIn}>Sign In</span>
            <span className={styles.signUp}>Sign Up</span>
          </div> : null}
        </div>
      </div>
    </section>
  )
}

export default BottomNavbar;