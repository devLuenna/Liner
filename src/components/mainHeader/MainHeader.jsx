import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from './MainHeader.module.css';

const Header = (props) => {

  const [searchWord, setSearchWord] = useState('');

  const history = useHistory();

  const goHomepage = () => { //로고 클릭 시 라이너 홈페이지로 이동
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
          <img className={styles.logo} src="../../../images/Logo/liner-logo.svg" alt="linerLogo" 
          onClick={goHomepage}
          />
        </div>
        <div className={styles.inputBox}>
          <input className={styles.inputSearch} type="text" placeholder="Search on LINER"
          value={searchWord}
          onChange={handleSearchWord}
          onKeyPress={handleKeyPress}
          />
          <img className={styles.searchBtn} src="../../../images/Button/search-finder-btn.svg" alt="searchBtn"
          onClick={handleSearch}
          />
        </div>
        <div className={styles.btns}>
          <span className={styles.signInBtn}>Sign In</span>
          <span className={styles.signUpBtn}>Sign Up</span>
        </div>
      </div>
    </header>
  )
}

export default Header;