import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { getRecommendedWords } from '../../api/listApi';
import styles from './SearchSideBar.module.css';

const SearchSideBar = ({ location }) => {

  const history = useHistory();
  const [recommendeds, setRecommendeds] = useState([]);

  let keyword = location.pathname.substring(19);
  keyword = keyword.replace(/-/gi, ' ');

  useEffect(() => {
    async function getAxiosData(){
      const recommendedData = await getRecommendedWords(keyword);
      setRecommendeds(recommendedData.items);
    }
    getAxiosData();
  }, [keyword])

  const handleSearch = (el) => {
    let encoded = encodeURI(el);
    encoded = encoded.replace(/%20/gi, '-');
    history.push(`/trusted-search/en/${encoded}`);
  }

  return (
    <section className={styles.container}>
      <h3 className={styles.sectionTitle}>People Also Searched For</h3>
      <div className={styles.sectionContent}>
        {recommendeds.map(el => 
        <span className={styles.tag} onClick={() => handleSearch(el)}>#{el}</span>
        )}
      </div>
    </section>
  );
}

export default withRouter(SearchSideBar);