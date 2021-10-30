import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/mainHeader/MainHeader';
import SearchSideBar from './components/searchSideBar/SearchSideBar';
import List from './pages/list/List';

function App() {

  // const [searchWord, setSearchWord] = useState(null);
  // const [users, setUsers] = useState(null);
  // const [recommendedWords, setRecommendedWords] = useState([]);
  // const [items, setItems] = useState([]);

  // const handleListPage = async (keyword) => {
  //   const searchData = await getSearchedItems(keyword);
  //   const recommendedData = await getRecommendedWords(keyword);
  //   setItems(searchData.items);
  //   console.log(searchData.items)
  //   setRecommendedWords(recommendedData.items);
  //   setSearchWord(keyword);
  //   setUsers(searchData.approx_trust);
  // }
 
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/trusted-search/en/:search">
          <body className={styles.container}>
            <List />
            <SearchSideBar />
          </body>
        </Route>
        <Route path="/trusted-search/highlight/en/:id/:title">
        </Route>
      </Switch>
    </>
  );
}

export default App;
