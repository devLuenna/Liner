import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import DetailContents from '../../components/detailContents/DetailContents';
import DetailHeader from '../../components/detailHeader/DetailHeader';
import { getItemInfo, getRecommendedItems } from '../../api/detailApi';
import styles from './Detail.module.css';
import ContentInList from '../../components/contentInList/ContentInList';

const Detail = ({ location }) => {

  const [item, setItem] = useState(null);
  const [itemUrl, setItemUrl] = useState(null);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const documentId = location.pathname.split('/')[4];

  useEffect(() => { //문서 상세 정보 받아오기
    async function getAxiosData(){
      const itemInfo = await getItemInfo(documentId);
      const url = new URL(itemInfo.url);
      console.log(itemInfo)
      setItem(itemInfo);
      setItemUrl(url);
    }
    getAxiosData();
    setTimeout(()=> {
      setLoading(false);
    }, 800);
  }, [documentId]);

  useEffect(() => { //추천 문서 배열 받아오기
    async function getAxiosData(){
      const itemInfo = await getItemInfo(documentId);
      const recommendeds = await getRecommendedItems(itemInfo.phrases[0].text || itemInfo.title, itemInfo.url, itemInfo.title);
      setRecommendedItems(recommendeds);
    }
    getAxiosData();
    setTimeout(()=> {
      setLoading(false);
    }, 800);
  }, [documentId])

  if(loading){
    return null;
  }else{
    return (
      <section className={styles.container}>
        <DetailHeader />
        <DetailContents item={item} itemUrl={itemUrl}/>
        <h3 className={styles.moreSectionTitle}>More Like This</h3>
        <ul className={styles.recommendedItems}>
          {recommendedItems.map(el => 
            <ContentInList key={el.id} item={el}/>
          )}
        </ul>
      </section>
    )
  }
}

export default withRouter(Detail);