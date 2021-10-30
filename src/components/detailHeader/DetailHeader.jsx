import React, { useContext } from 'react';
import { ModalInfoContextStore } from '../../contexts/ModalContext';
import styles from './DetailHeader.module.css';

const DetailHeader = (props) => {

  const modalInfo = useContext(ModalInfoContextStore);

  return (
    <header className={styles.container}>
      <img className={styles.backIcon} src="../../../images/Button/back-btn.svg" alt="backIcon"/>
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
    </header>
  )
}

export default DetailHeader;