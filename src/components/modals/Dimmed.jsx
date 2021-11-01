import React, { useContext } from 'react';
import { ModalInfoContextStore } from '../../contexts/ModalContext';
import styles from './Dimmed.module.css';

const Dimmed = (props) => {
  
  const modalInfo = useContext(ModalInfoContextStore);

  return (
    <section 
      className={styles.modalContainer} 
      onClick={() => modalInfo.setDimmedOn(false)}>
    </section>
  )
}
export default Dimmed;