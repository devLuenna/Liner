import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getSearchedItems } from '../../api/listApi';
import ContentInList from '../../components/contentInList/ContentInList';
import styles from './List.module.css';

const List = ({ location }) => {


  const [items, setItems] = useState([]);
  const [users, setUsers] = useState(null);

  let keyword = location.pathname.substring(19);
  keyword = keyword.replace(/-/gi, ' ');

  useEffect(() => {
    async function getAxiosData(){
      const searchData = await getSearchedItems(keyword);
      setItems(searchData.items);
      console.log(searchData.items);
      setUsers(searchData.approx_trust);
    }
    getAxiosData();
  }, [keyword])


  return (
    <section className={styles.container}>
      <header className={styles.listHeader}>
        <h1 className={styles.resultMsg}>We found Trusted Results!</h1>
        <div className={styles.resultDetail}>Trusted Results on '{keyword}' from {users} people.</div>
      </header>
      <ul className={styles.itemsList}>
        {items.map(el => 
          <ContentInList item={el}/>
        )}
      </ul>
    </section>
  )
}

export default withRouter(List);