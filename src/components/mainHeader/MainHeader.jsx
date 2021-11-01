import React, { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { ModalInfoContextStore } from '../../contexts/ModalContext';
import styles from './MainHeader.module.css';

const Header = ({ location }) => {
  
  const history = useHistory();
  const [searchWord, setSearchWord] = useState('');
  const modalInfo = useContext(ModalInfoContextStore);

  useEffect(()=> {
    if(location.pathname === '/' || location.pathname.split('/')[3] === 'en'){ //홈화면 or 디테일 페이지일 때 인풋박스 value 비우기 
      setSearchWord('');
    }else{ //리스트페이지일 때 엔드포인트에서 인풋박스 value 가져오기
      setSearchWord(location.pathname.split('/')[3].replace(/-/gi, ' '));
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
    let encoded = encodeURI(searchWord); //검색값 인코딩
    encoded = encoded.replace(/%20/gi, '-'); //인코딩된 띄어쓰기 값은 하이픈으로 Replace
    history.push(`/trusted-search/en/${encoded}`); // 리스트페이지로 이동
    modalInfo.setDimmedOn(false); //검색 완료 후 dimmed off
  }
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoBox}>
          <img className={styles.logo} src="/images/Logo/liner-logo.svg" alt="linerLogo" 
          onClick={goHomepage}
          />
          <img className={styles.mobilelogo} src="/images/Logo/liner-logo-mobile.jpeg" alt="linerLogo" 
          onClick={goHomepage}
          />
        </div>
        <div className={styles.inputBox}>
          <input className={styles.inputSearch} type="text" placeholder="Search on LINER"
          value={searchWord}
          onClick={() => modalInfo.setDimmedOn(true)}
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