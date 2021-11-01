import React from 'react';
import styles from './DetailContents.module.css';

const DetailContents = ({ item, itemUrl }) => {

  const goURLPage = () => { //로고 클릭 시 라이너 홈페이지로 이동
    window.open("about:blank").location.href = itemUrl;
  };

  const handleFaviconError = (e) => {
    e.target.src = "/images/Favicon/default-favicon.svg";
  }

  return ( 
    <section className={styles.container}>
      {item.image_url 
      ? <img className={styles.img} src={item.image_url} alt="img_url"/> 
      : null}
      <h2 className={styles.title}>{item.title}</h2>
      <div className={styles.urlContainer}>
        <img src={item.favicon_url || "/images/Favicon/default-favicon.svg"} alt="urlFavicon" 
        onError={handleFaviconError}
        onClick={goURLPage}/>
        <a href={itemUrl} target='_sub'>{itemUrl.hostname}</a>
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