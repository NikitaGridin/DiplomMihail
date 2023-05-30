import React from 'react'

import Neuadd from '../../assets/neuadd.jpg'
import Form from './Form';

const Reservation = () => {
  return (
    <div className='mx-6 grid xl:grid-cols-2 xl:gap-20'>
      <Form />
      <img src={Neuadd} alt="" className='hidden xl:block rounded-xl h-full object-cover'/>
    </div>
  )
}

export default Reservation;