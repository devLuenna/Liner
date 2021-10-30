import React from 'react';
import styles from './ContentInList.module.css';

const ContentInList = ({ item }) => {

  const url = new URL(item.url);
  const urlHost = url.origin;

  const goURLPage = () => { //로고 클릭 시 라이너 홈페이지로 이동
    window.open("about:blank").location.href = url;
  }

  return (
    <li className={styles.container}>
      <div className={styles.dataAndImg}>
        <div className={styles.metaData}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.content}>{item.description}</p>
        </div>
        <div className={styles.thumbnail}>
          <img src={item.image_url || "../../../images/Thumbnail/default-thumb-1.svg"} alt="thumbnail"/>
        </div>
      </div>
      <div className={styles.urlSection}>
        <div className={styles.urlContainer}>
          <img src={item.favicon_url || "../../../images/Favicon/default-favicon.svg"} alt="urlFavicon" onClick={goURLPage}/>
          <a href={url} target='_blank'>{urlHost}</a>
        </div>
        <div className={styles.icons}>
          <div className={styles.bookmarkContainer}>
            <img className={styles.bookmarkIcon} src="../../../images/Button/bookmark-btn.svg" alt="bookmarkIcon"/>
            <span className={styles.toolTip}>Save</span>
          </div>
          <img className={styles.shareIcon} src="../../../images/Button/share-btn.svg" alt="saveIcon"/>
        </div>
      </div>
    </li>
  );
}

export default ContentInList;