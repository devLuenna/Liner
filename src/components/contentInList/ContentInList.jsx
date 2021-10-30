import React from 'react';
import styles from './ContentInList.module.css';

const ContentInList = ({ item }) => {
  return (
    <li className={styles.container}>
      <div className={styles.dataAndImg}>
        <div className={styles.metaData}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.content}>{item.description}</p>
        </div>
        <div className={styles.img}>
          <img src="../../../images/Thumbnail/default-thumb-0.svg" alt="thumbnail"/>
        </div>
      </div>
      <div className={styles.urlSection}>
        <div className={styles.urlContainer}>
          <img src="../../../images/Favicon/default-favicon.svg" alt="urlFavicon"/>
          <a>www.javascript.com</a>
        </div>
        <div className={styles.icons}>
          <img src="../../../images/Button/bookmark-btn.svg" alt="bookmarkIcon"/>
          <img src="../../../images/Button/share-btn.svg" alt="saveIcon"/>
        </div>
      </div>
    </li>
  );
}

export default ContentInList;