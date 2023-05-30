import React from 'react'

import Form from './Form';

import img from '../../assets/logIn_img.png'

const LogIn = () => {
  return (
    <div className='mx-6 xl:grid xl:grid-cols-6 xl:gap-20'>
      <Form/>
      <img src={img} alt="peoples" className='hidden col-span-4 h-full object-cover rounded-3xl xl:block w-full'/>
    </div>
  )
}

export default LogIn;