import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import Header from './components/mainHeader/MainHeader';
import Dimmed from './components/modals/Dimmed';
import SignInModal from './components/modals/SignInModal';
import SignUpModal from './components/modals/SignUpModal';
import ReadSideBar from './components/readSideBar/ReadSideBar';
import ScrollTop from './components/scrollTop/ScrollTop';
import SearchSideBar from './components/searchSideBar/SearchSideBar';
import { ModalInfoContextStore } from './contexts/ModalContext';
import Detail from './pages/detail/Detail';
import List from './pages/list/List';
import Search from './pages/search/Search';

function App() {
 
  const modalInfo = useContext(ModalInfoContextStore);

  return (
    <ScrollTop>
      <Switch>
        <Route exact path="/">
          <Header />
          <BottomNavbar />
        </Route>
        <Route path="/search">
          <Search />
          <BottomNavbar />
        </Route>
        <Route path="/trusted-search/en/:keyword">
          <Header />
          <div className={styles.container}>
            <List />
            <SearchSideBar />
          </div>
          <BottomNavbar />
        </Route>
        <Route path="/trusted-search/highlight/en/:id/:title">
          <Header />
          <section className={styles.container}>
            <Detail />
            <div>
              <SearchSideBar />
              <ReadSideBar />  
            </div>
          </section>
          <BottomNavbar />
        </Route>
      </Switch>
      {modalInfo.signInModal ? <SignInModal /> : null}
      {modalInfo.signUpModal ? <SignUpModal /> : null}
      {modalInfo.dimmedOn ? <Dimmed /> : null}
    </ScrollTop>
  );
}

export default App;
