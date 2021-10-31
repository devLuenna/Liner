import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import { getPeopleAlsoRead } from '../../api/detailApi';
import styles from './ReadSideBar.module.css';

const ReadSideBar = ({ location }) => {

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [recommendeds, setRecommendeds] = useState([]);
  const [restData, setRestData] = useState([]);
  const [anchor, setAnchor] = useState(null);
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  
  useEffect(() => {
    async function getAxiosData(){
      const recommendedData = await getPeopleAlsoRead(location.pathname.split('/')[4], null);
      setRecommendeds(recommendedData.items.slice(0, 7));
      setRestData(recommendedData.items.slice(7));
      setAnchor(recommendedData.anchor);
    }
    getAxiosData();
    setShowMoreBtn(true);
    setTimeout(()=> {
      setLoading(false);
    }, 800);
  }, [location.pathname])

  const showMore = async () => {
    setRecommendeds(recommendeds.concat(restData.slice(0, 5)));
    setRestData(restData.slice(5));
    if(restData.length === 0){
      const recommendedData = await getPeopleAlsoRead(location.pathname.split('/')[4], anchor);
      setRecommendeds(recommendeds.concat(recommendedData.items.slice(0, 7)));
      setRestData(recommendedData.items.slice(7));
      setAnchor(recommendedData.anchor);
      if(recommendedData.items.slice(7).length === 0){
        setShowMoreBtn(false);
      }
    }
  }
  
  const goDetailPage = (el) => {
    let encodedTitle = encodeURI(el.title);
    encodedTitle = encodedTitle.replace(/%20/gi, '-');
    history.push(`/trusted-search/highlight/en/${el.document_id}/${encodedTitle}`);
  }

  if(loading){
    return (
      <section className={styles.container}>
        <h3 className={styles.sectionTitle}>People Also Read</h3>
        <div className={styles.loadingBox}>
          <img className={styles.loading} src="/images/Loading/loadingSpinner.gif" alt="loading"/>
        </div>
      </section>
    )
  } else{
  return (
    <section className={styles.container}>
      <h3 className={styles.sectionTitle}>People Also Read</h3>
      <ul className={styles.sectionContent}>
        {recommendeds.map(el => 
          <li key={el.document_id} className={styles.item} onClick={() => goDetailPage(el)}>
            <h3 className={styles.title}>{el.title}</h3>
            <a href={el.url} className={styles.url}>{new URL(el.url).hostname}</a>
          </li>
        )}
      </ul>
      {showMoreBtn ? 
      <div className={styles.showMore} onClick={showMore}>
        <span>Show More</span>
        <img src="/images/Button/show-more-btn.svg" alt="showMoreIcon"/>
      </div> : null}
    </section>
  )};
}

export default withRouter(ReadSideBar);