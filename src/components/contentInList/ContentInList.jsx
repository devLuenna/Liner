import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { ModalInfoContextStore } from '../../contexts/ModalContext';
import styles from './ContentInList.module.css';

const ContentInList = ({ item }) => {

  const history = useHistory();
  const modalInfo = useContext(ModalInfoContextStore);
  
  const imgArr = [];
  for(let i=0; i<6; i++){
    imgArr.push(`/images/Thumbnail/default-thumb-${i}.svg`)
  };

  const url = new URL(item.url);
  const urlHost = url.hostname;

  const goURLPage = () => { //문서의 원본 웹페이지로 이동
    window.open("about:blank").location.href = url;
  }

  const goDetailPage = () => { 
    let encodedTitle = encodeURI(item.title); //문서의 타이틀 인코딩
    encodedTitle = encodedTitle.replace(/%20/gi, '-'); //인코딩된 띄어쓰기 값은 하이픈으로 Replace
    history.push(`/trusted-search/highlight/en/${item.document_id}/${encodedTitle}`); //클릭 시 디테일 페이지로 이동
  }

  const handleThumbnailError = (e) => { //유효하지 않은 이미지 주소일 때 엑박뜨는 것 처리
    e.target.src = imgArr[Math.floor(Math.random()*6)]; //6개의 이미지 src 중에서 랜덤으로 1개 
  }
  
  const handleFaviconError = (e) => { //유효하지 않은 이미지 주소일 때 엑박뜨는 것 처리
    e.target.src = "/images/Favicon/default-favicon.svg";
  }

  return (
    <li className={styles.container}>
      <div className={styles.dataAndImg}>
        <div className={styles.metaData}>
          <h3 className={styles.title} onClick={goDetailPage}>{item.title}</h3>
          <p className={styles.content}>{item.description}</p>
        </div>
        <div className={styles.thumbnail}>
          <img src={item.image_url || imgArr[Math.floor(Math.random()*6)]} alt="thumbnail"
          onError={handleThumbnailError}
          onClick={goDetailPage}/>
        </div>
      </div>
      <div className={styles.urlSection}>
        <div className={styles.urlContainer}>
          <img src={item.favicon_url || "/images/Favicon/default-favicon.svg"} alt="urlFavicon" 
          onError={handleFaviconError}
          onClick={goURLPage}/>
          <a href={url} target='_sub'>{urlHost}</a>
        </div>
        <div className={styles.icons}>
          <div className={styles.iconContainer}>
            <img className={styles.bookmarkIcon} src="/images/Button/bookmark-btn.svg" alt="bookmarkIcon"
            onClick={() => modalInfo.setSignUpModal(true)}/>
            <span className={styles.toolTip}>Save</span>
          </div>
          <div className={styles.iconContainer}>
            <img className={styles.shareIcon} src="/images/Button/share-btn.svg" alt="saveIcon"
            onClick={() => modalInfo.setSignUpModal(true)}/>
            <span className={styles.toolTip}>Share</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ContentInList;