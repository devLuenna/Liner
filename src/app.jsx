import React, { useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/mainHeader/MainHeader';
import SignInModal from './components/modals/SignInModal';
import SignUpModal from './components/modals/SignUpModal';
import ReadSideBar from './components/readSideBar/ReadSideBar';
import SearchSideBar from './components/searchSideBar/SearchSideBar';
import { ModalInfoContextStore } from './contexts/ModalContext';
import Detail from './pages/detail/Detail';
import List from './pages/list/List';

function App() {
 
  const modalInfo = useContext(ModalInfoContextStore);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/trusted-search/en/:keyword">
          <div className={styles.container}>
            <List />
            <SearchSideBar />
          </div>
        </Route>
        <Route path="/trusted-search/highlight/en/:id/:title">
          <div className={styles.container}>
            <Detail />
            <section>
              <SearchSideBar />
              <ReadSideBar />  
            </section>
          </div>
        </Route>
      </Switch>
      {modalInfo.signInModal ? <SignInModal/> : null}
      {modalInfo.signUpModal ? <SignUpModal/> : null}
    </>
  );
}

export default App;
