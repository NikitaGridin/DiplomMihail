import React from 'react'

import Info from './Info';
import Reservations from './Reservations';
import Secure from './Secure';

const Account = () => {
  return (
    <div className='mx-6 grid grid-cols-1 gap-20 xl:grid-cols-2'>
        <Info />
        <Secure />
        <Reservations/>
    </div>
  )
}

export default Account;