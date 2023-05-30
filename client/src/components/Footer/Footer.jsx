import React from 'react'
import { Link } from 'react-router-dom';

import logoWhite from '../../assets/logo_white.svg';

import Info from './Info'
import Social from './Social'
import MainText from './MainText'

const Footer = () => {
  return (
    <div className='mt-36 bg-[#101010] text-white py-16 px-6 lg:grid lg:grid-cols-3 lg:gap-20 lg:gap-y-0'>
      <div className='col-span-2'>
        <Link to="/main" className='flex items-center text-5xl font-extrabold mb-5 md:text-3xl'><img src={logoWhite} alt="logo" className='mr-4 w-20 md:w-16'/>АРОМАТ</Link>
        <MainText />
      </div>
        <Info />
        <Social />
    </div>
  )
}

export default Footer;