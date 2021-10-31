import React, { useCallback, useEffect, useState } from 'react';
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
  
  const [anchor, setAnchor] = useState(null);
  const [scrollLoading, setScrollLoading] = useState(true); //무한스크롤 시 댓글 로딩

  const documentId = location.pathname.split('/')[4];

  useEffect(() => { //문서 상세 정보 받아오기
    async function getAxiosData(){
      const itemInfo = await getItemInfo(documentId);
      const url = new URL(itemInfo.url);
      setItem(itemInfo);
      setItemUrl(url);
    }
    getAxiosData();
    setTimeout(()=> {
      setLoading(false);
    }, 800);
  }, [documentId]);


  const fetchMoreData = async () => { //추천문서 추가로 받아오는 함수
    let text = item.title;
    if(item.phrases[0]){
      text = item.phrases[0].text;
    }
    let recommendeds = await getRecommendedItems(anchor, text, item.url, item.title);
    if(recommendeds.items.length !== 0){
      setScrollLoading(true);
      //setTimeout(()=> {
        setRecommendedItems(recommendedItems.concat(recommendeds.items));
        setAnchor(recommendeds.anchor);
        setScrollLoading(false);
      //}, 200)
    }
  }

  const _infiniteScroll = useCallback(()=> { //스크롤 높이 및 정도 감지하여, 조건 만족하면 fetchMoreData함수 호출
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 100;
    if(scrollTop+clientHeight >= scrollHeight && !scrollLoading){
      fetchMoreData();
    }
  }, [scrollLoading])

  useEffect(() => { //페이지마운트 시 처음 12개 추천문서데이터 받아오기
    async function getAxiosData(){
      setScrollLoading(true);
      let itemInfo = await getItemInfo(documentId);
      let text = itemInfo.title;
      if(itemInfo.phrases[0]){
        text = itemInfo.phrases[0].text;
      }
      let recommendeds = await getRecommendedItems(null, text, itemInfo.url, itemInfo.title);
      setRecommendedItems(recommendeds.items);
      setAnchor(recommendeds.anchor);
      setScrollLoading(false);
    }
    getAxiosData();
  }, [documentId])


  useEffect(()=> {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true); 
  }, [_infiniteScroll])


  
  if(loading){
    return (
      <section className={styles.container}>
      </section>
    )
  }else{
    return (
      <section className={styles.container}>
        <DetailHeader />
        <DetailContents item={item} itemUrl={itemUrl}/>
        <h3 className={styles.moreSectionTitle}>More Like This</h3>
        <ul className={styles.recommendedItems}>
          {recommendedItems.map(el => 
            <ContentInList key={el.document_id} item={el}/>
          )}
          {scrollLoading ?
          <div className={styles.loadingBox}>
            <img className={styles.loading} src="/images/Loading/loadingSpinner.gif" alt="loading"/>
          </div> : null}
        </ul>
      </section>
    )
  }
}

export default withRouter(Detail);