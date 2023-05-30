import React from 'react'

import Form from './Form';

import img from '../../assets/signIn_img.png'

const SignIn = () => {
  return (
    <div className='mx-6 xl:grid xl:grid-cols-6 xl:gap-20'>
      <Form/>
      <img src={img} alt="peoples" className='hidden col-span-4 w-full h-full object-cover rounded-3xl xl:block'/>
    </div>
  )
}

export default SignIn;