import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getSearchedItems } from '../../api/listApi';
import ContentInList from '../../components/contentInList/ContentInList';
import styles from './List.module.css';

const List = ({ location }) => {

  const [items, setItems] = useState([]);
  const [users, setUsers] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [isLoading, setIsLoading] = useState(true); //무한스크롤 시 댓글 로딩

  let keyword = location.pathname.split('/')[3];
  keyword = keyword.replace(/-/gi, ' ');


  const fetchMoreData = async () => { //데이터를 추가로 받아오는 함수
    const searchData = await getSearchedItems(keyword, anchor);
      if(searchData.items.length !== 0){
      setIsLoading(true);
      setTimeout(()=> {
        setItems(items.concat(searchData.items));
        setAnchor(searchData.anchor);
        setIsLoading(false);  
      }, 300)
    }
  }

  const _infiniteScroll = useCallback(()=> { //스크롤 높이 및 정도 감지하여, 조건 만족하면 fetchMoreData함수 호출
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 100;
    if(scrollTop+clientHeight >= scrollHeight && !isLoading){
      fetchMoreData();
    }
  }, [isLoading])

  useEffect(() => { //페이지마운트 시 처음 20개 데이터 받아오기
    async function getAxiosData(){
      setIsLoading(true);
      const searchData = await getSearchedItems(keyword, null);
      setItems(searchData.items);
      setUsers(searchData.approx_trust);
      setAnchor(searchData.anchor);
      setIsLoading(false);
    }
    getAxiosData();
    window.scrollTo({ //검색키워드가 변경될 때마다 스크롤 위로 올려서 결과 보여주기
      top: 0,
      behavior: "smooth",
    });
  }, [keyword])


  useEffect(()=> {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true); 
  }, [_infiniteScroll])



  return (
    <section className={styles.container}>
      <header className={styles.listHeader}>
        <h1 className={styles.resultMsg}>We found Trusted Results!</h1>
        <div className={styles.resultDetail}>Trusted Results on '{keyword}' from {users} people.</div>
      </header>
      <ul className={styles.itemsList}>
        {items.map(el => 
          <ContentInList key={el.document_id} item={el}/>
        )}
        {isLoading ?
        <div className={styles.loadingBox}>
          <img className={styles.loading} src="/images/Loading/loadingSpinner.gif" alt="loading"/>
        </div> : null}
      </ul>
    </section>
  )
}

export default withRouter(List);