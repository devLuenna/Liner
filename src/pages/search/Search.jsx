import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from './Search.module.css';

const Search = (props) => {

  const history = useHistory();
  const [searchWord, setSearchWord] = useState('');

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
    <section className={styles.container}>
      <h2 className={styles.header}>Search</h2>
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
    </section>
  )
}

export default Search;