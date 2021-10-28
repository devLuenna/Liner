import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './app.css';
import Header from './components/header/Header';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/trusted-search/en/:search">
          
        </Route>
        <Route path="/trusted-search/highlight/en/:id/:title">
          
        </Route>
      </Switch>
    </>
  );
}

export default App;
