import React, { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { ModalInfoContextStore } from '../../contexts/ModalContext';
import styles from './MainHeader.module.css';

const Header = ({ location }) => {
  
  const history = useHistory();
  const [searchWord, setSearchWord] = useState('');
  const modalInfo = useContext(ModalInfoContextStore);

  useEffect(()=> {
    setSearchWord(location.pathname.split('/')[3].replace(/-/gi, ' '));
    if(location.pathname.split('/')[3] === 'en'){
      setSearchWord('');
    }
  }, [location.pathname])

  const goHomepage = () => { 
    window.location.href = "https://getliner.com/"
  }

  const handleSearchWord = (e) => {
    setSearchWord(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleSearch();
    }
  }

  const handleSearch = () => {
    let encoded = encodeURI(searchWord);
    encoded = encoded.replace(/%20/gi, '-');
    history.push(`/trusted-search/en/${encoded}`);
  }
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoBox}>
          <img className={styles.logo} src="/images/Logo/liner-logo.svg" alt="linerLogo" 
          onClick={goHomepage}
          />
        </div>
        <div className={styles.inputBox}>
          <input className={styles.inputSearch} type="text" placeholder="Search on LINER"
          value={searchWord}
          onChange={handleSearchWord}
          onKeyPress={handleKeyPress}
          />
          <img className={styles.searchBtn} src="/images/Button/search-finder-btn.svg" alt="searchBtn"
          onClick={handleSearch}
          />
        </div>
        <div className={styles.btns}>
          <span className={styles.signInBtn} onClick={() => modalInfo.setSignInModal(true)}>Sign In</span>
          <span className={styles.signUpBtn} onClick={() => modalInfo.setSignUpModal(true)}>Sign Up</span>
        </div>
      </div>
    </header>
  )
}

export default withRouter(Header);