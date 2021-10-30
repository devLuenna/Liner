import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/mainHeader/MainHeader';
import SignInModal from './components/modals/SignInModal';
import SignUpModal from './components/modals/SignUpModal';
import SearchSideBar from './components/searchSideBar/SearchSideBar';
import List from './pages/list/List';

function App() {
 
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(true);

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
      {signInModal 
      ? <SignInModal />
      : null}
      {signUpModal 
      ? <SignUpModal />
      : null}
    </>
  );
}

export default App;
