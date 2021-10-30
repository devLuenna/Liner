import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { ModalInfoContextStore } from '../../contexts/ModalContext';
import styles from './ContentInList.module.css';

const ContentInList = ({ item }) => {

  const history = useHistory();
  const modalInfo = useContext(ModalInfoContextStore);

  const url = new URL(item.url);
  const urlHost = url.origin;

  const goURLPage = () => { //로고 클릭 시 라이너 홈페이지로 이동
    window.open("about:blank").location.href = url;
  }

  const goDetailPage = () => {
    let encodedTitle = encodeURI(item.title);
    encodedTitle = encodedTitle.replace(/%20/gi, '-');
    history.push(`/trusted-search/highlight/en/${item.document_id}/${encodedTitle}`);
  }

  return (
    <li className={styles.container}>
      <div className={styles.dataAndImg}>
        <div className={styles.metaData}>
          <h3 className={styles.title} onClick={goDetailPage}>{item.title}</h3>
          <p className={styles.content}>{item.description}</p>
        </div>
        <div className={styles.thumbnail}>
          <img src={item.image_url || "../../../images/Thumbnail/default-thumb-1.svg"} alt="thumbnail"
          onClick={goDetailPage}/>
        </div>
      </div>
      <div className={styles.urlSection}>
        <div className={styles.urlContainer}>
          <img src={item.favicon_url || "../../../images/Favicon/default-favicon.svg"} alt="urlFavicon" onClick={goURLPage}/>
          <a href={url} target='_blank'>{urlHost}</a>
        </div>
        <div className={styles.icons}>
          <div className={styles.iconContainer}>
            <img className={styles.bookmarkIcon} src="../../../images/Button/bookmark-btn.svg" alt="bookmarkIcon"
            onClick={() => modalInfo.setSignUpModal(true)}/>
            <span className={styles.toolTip}>Save</span>
          </div>
          <div className={styles.iconContainer}>
            <img className={styles.shareIcon} src="../../../images/Button/share-btn.svg" alt="saveIcon"
            onClick={() => modalInfo.setSignUpModal(true)}/>
            <span className={styles.toolTip}>Share</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ContentInList;