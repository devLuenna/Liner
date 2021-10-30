import React from 'react';
import ContentInList from '../../components/contentInList/ContentInList';
import styles from './List.module.css';

const List = ({ searchWord, users, items }) => {
  return (
    <section className={styles.container}>
      <header className={styles.listHeader}>
        <h1 className={styles.resultMsg}>We found Trusted Results!</h1>
        <div className={styles.resultDetail}>Trusted Results on '{searchWord}' from {users} people.</div>
      </header>
      <ul className={styles.itemsList}>
        {items.map(el => 
          <ContentInList 
          item={el}
          />
        )}
      </ul>
    </section>
  )
}

export default List;