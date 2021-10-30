import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import ModalInfoContext from './contexts/ModalContext';



ReactDOM.render(
  <React.StrictMode>
    <ModalInfoContext>
      <Router>
        <App />
      </Router>
    </ModalInfoContext>
  </React.StrictMode>,
  document.getElementById('root')
);

