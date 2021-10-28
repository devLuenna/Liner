import React from 'react';
import styles from './SearchSideBar.module.css';

const SearchSideBar = ({ recommendeds }) => {
  return (
    <section className={styles.container}>
      <h3 className={styles.sectionTitle}>People Also Searched For</h3>
      <div className={styles.sectionContent}>
        {recommendeds.map(el => <span className={styles.tag}>#{el}</span>)}
      </div>
    </section>
  );
}

export default SearchSideBar;