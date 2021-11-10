import React, { useRef } from 'react';
import styles from './DetailContents.module.css';

const DetailContents = ({ item }) => {

  const imgRef = useRef();

  const goURLPage = () => { //문서의 원본 웹페이지로 이동
    window.open("about:blank").location.href = item.url;
  };

  const handleFaviconError = (e) => { //유효하지 않은 이미지 주소일 때 엑박뜨는 것 처리
    e.target.src = "/images/Favicon/default-favicon.svg";
  }

  const handleImgError = (e) => { //유효하지 않은 이미지 주소일 때 엑박뜨는 것 처리
    imgRef.current.style = "display: none";
  }

  return ( 
    <section className={styles.container}>
      {item.image_url 
      ? <img ref={imgRef} className={styles.img} src={item.image_url} alt="img_url"
      onError={handleImgError}/> 
      : null}
      <h2 className={styles.title}>{item.title}</h2>
      <div className={styles.urlContainer}>
        <img src={item.favicon_url || "/images/Favicon/default-favicon.svg"} alt="urlFavicon" 
        onError={handleFaviconError}
        onClick={goURLPage}/>
        <a href={item.url} target='_sub'>{new URL(item.url).hostname}</a>
      </div>
      <div className={styles.highlight}>
        <img src="/images/Highlight/bling.svg" alt="bling"/>
        <h4>Popular Highlights</h4>
      </div>
      <ul className={styles.phrases}>
        {item.phrases.map(el => 
        <li key={el} className={styles.phrase}>{el.text}</li>
        )}
      </ul>
      <div className={styles.viewOriginal} onClick={goURLPage}>View Original</div>
      <div className={styles.metaDatas}>
        <div className={styles.metaData}>
          <h4>Description</h4>
          <p>{item.description || null}</p>
        </div>
        <div className={styles.metaData}>
          <h4>Authors</h4>
          <p>{item.author || null}</p>
        </div>
        <div className={styles.metaData}>
          <h4>Country</h4>
          <p>{item.country || null}</p>
        </div>
      </div>
    </section>
  )
}

export default DetailContents;