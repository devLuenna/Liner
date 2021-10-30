import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { getRecommendedWordsDetail } from '../../api/detailApi';
import { getRecommendedWordsList } from '../../api/listApi';
import styles from './SearchSideBar.module.css';

const SearchSideBar = ({ location }) => {

  const history = useHistory();
  const [recommendeds, setRecommendeds] = useState([]);
  const [loading, setLoading] = useState(true);

  let keyword = location.pathname.split('/')[3];
  keyword = keyword.replace(/-/gi, ' ');

  useEffect(() => {
    async function getAxiosData(){
      let recommendedData;
      if(location.pathname.split('/').length === 4){
        recommendedData = await getRecommendedWordsList(keyword);
      } else{
        recommendedData = await getRecommendedWordsDetail(location.pathname.split('/')[4]);
        console.log(recommendedData);
      }
      setRecommendeds(recommendedData);
    }
    getAxiosData();
    setTimeout(()=> {
      setLoading(false);
    }, 800);
  }, [location.pathname])

  const handleSearch = (el) => {
    let encoded = encodeURI(el);
    encoded = encoded.replace(/%20/gi, '-');
    history.push(`/trusted-search/en/${encoded}`);
  }

  if(loading){
    return null;
  } else{
  return (
    <section className={styles.container}>
      <h3 className={styles.sectionTitle}>People Also Searched For</h3>
      <div className={styles.sectionContent}>
        {recommendeds.map(el => 
        <span className={styles.tag} onClick={() => handleSearch(el)}>#{el}</span>
        )}
      </div>
    </section>
  )};
}

export default withRouter(SearchSideBar);