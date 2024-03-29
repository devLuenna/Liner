import React, { createContext, useState } from 'react';


export const ModalInfoContextStore = createContext();

const ModalInfoContext = (props) => {
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [dimmedOn, setDimmedOn] = useState(false);

  const modalInfo = {
    signInModal,
    signUpModal,
    dimmedOn,
    setSignInModal, 
    setSignUpModal,
    setDimmedOn
  };

  return (
    <ModalInfoContextStore.Provider value={modalInfo}> 
      {props.children}
    </ModalInfoContextStore.Provider>
  )
}

export default ModalInfoContext;