import React, { useContext, useEffect } from 'react';
import { ModalInfoContextStore } from '../../contexts/ModalContext';
import styles from './Dimmed.module.css';

const Dimmed = (props) => {
  
  const modalInfo = useContext(ModalInfoContextStore);
  
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
    
  }, []);

  return <section className={styles.modalContainer} onClick={() => modalInfo.setDimmedOn(false)}></section>

}
export default Dimmed;