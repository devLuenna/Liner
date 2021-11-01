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
  
  useEffect(() => { //최초에 api 요청 보내고 추천문서 리스트 받고 & 7개만 랜더링하기
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
  }, [location.pathname]) //엔드포인트가 변경될 때마다 새롭게 api 요청을 보내야 함.


  const showMore = async () => { //showmore 버튼 클릭 시 5개씩 끊어서 추가 랜더링.
    setRecommendeds(recommendeds.concat(restData.slice(0, 5)));
    setRestData(restData.slice(5));
    if(restData.length === 0){
      const recommendedData = await getPeopleAlsoRead(location.pathname.split('/')[4], anchor);
      setRecommendeds(recommendeds.concat(recommendedData.items.slice(0, 7)));
      setRestData(recommendedData.items.slice(7));
      setAnchor(recommendedData.anchor);
      if(recommendedData.items.slice(7).length === 0){ //더이상 api응답으로 받아온 데이터가 없을 때 버튼 랜더링 막기
        setShowMoreBtn(false);
      }
    }
  }

  const goDetailPage = (el) => { //추천문서 타이틀 클릭 시 디테일페이지로 이동
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
          <li key={el.document_id} className={styles.item}>
            <h3 className={styles.title} onClick={() => goDetailPage(el)}>{el.title}</h3>
            <a href={el.url} target='_sub' className={styles.url}>{new URL(el.url).hostname}</a>
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