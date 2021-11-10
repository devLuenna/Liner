import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { getPeopleAlsoSearchedForInDetail } from '../../api/detailApi';
import { getPeopleAlsoSearchedForInList } from '../../api/listApi';
import styles from './SearchSideBar.module.css';

const SearchSideBar = ({ location }) => {

  const history = useHistory();
  const [recommendeds, setRecommendeds] = useState([]);
  const [loading, setLoading] = useState(true);

  let keyword = location.pathname.split('/')[3];
  keyword = keyword.replace(/-/gi, ' ');

  useEffect(() => {
    async function getAxiosData(){ //추천검색어 받아오기
      let recommendedData;
      if(location.pathname.split('/').length === 4){
        recommendedData = await getPeopleAlsoSearchedForInList(keyword); //리스트 페이지일 때
      } else{
        recommendedData = await getPeopleAlsoSearchedForInDetail(location.pathname.split('/')[4]); //디테일 페이지일 때
      }
      setRecommendeds(recommendedData);
    }
    console.log(location.pathname.split('/'))
    getAxiosData();
    setTimeout(()=> {
      setLoading(false);
    }, 800);
  }, [location.pathname])

  const handleSearch = (el) => { //검색어 키워드 클릭 시 디테일 페이지로 이동
    let encoded = encodeURI(el);
    encoded = encoded.replace(/%20/gi, '-');
    history.push(`/trusted-search/en/${encoded}`);
  }

  if(loading){
    return (
      <section className={styles.container}>
        <h3 className={styles.sectionTitle}>People Also Searched For</h3>
        <div className={styles.loadingBox}>
          <img className={styles.loading} src="/images/Loading/loadingSpinner.gif" alt="loading"/>
        </div>
      </section>
      )
  } else{
  return (
    <section className={location.pathname.split('/')[2] === 'en' ? styles.container : styles.containerList}>
      <h3 className={styles.sectionTitle}>People Also Searched For</h3>
      <div className={styles.sectionContent}>
        {recommendeds.map(el => 
        <span key={el} className={styles.tag} onClick={() => handleSearch(el)}>#{el}</span>
        )}
      </div>
    </section>
  )};
}

export default withRouter(SearchSideBar);