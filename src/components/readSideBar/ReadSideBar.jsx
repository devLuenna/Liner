import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import { getPeopleAlsoRead } from '../../api/detailApi';
import styles from './ReadSideBar.module.css';

const ReadSideBar = ({ location }) => {

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [recommendeds, setRecommendeds] = useState([]);
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  
  useEffect(() => {
    async function getAxiosData(){
      const recommendedData = await getPeopleAlsoRead(location.pathname.split('/')[4]);
      console.log(recommendedData);
      setRecommendeds(recommendedData.slice(0, 7));
    }
    getAxiosData();
    setShowMoreBtn(true);
    setTimeout(()=> {
      setLoading(false);
    }, 800);
  }, [location.pathname])

  const goDetailPage = (el) => {
    let encodedTitle = encodeURI(el.title);
    encodedTitle = encodedTitle.replace(/%20/gi, '-');
    history.push(`/trusted-search/highlight/en/${el.document_id}/${encodedTitle}`);
  }

  const showMore = async () => {
    const recommendedData = await getPeopleAlsoRead(location.pathname.split('/')[4]);
    setRecommendeds(recommendedData.slice(0, 12));
    setShowMoreBtn(false);
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