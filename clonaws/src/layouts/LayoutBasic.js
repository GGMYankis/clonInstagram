


import React from 'react'
import Header from '../components/Header';

function LayoutBasic(props) {

    const {children}  = props;
     return (
          <>   
            <Header/>
            {children}
          </>
  )
}

export default LayoutBasic
