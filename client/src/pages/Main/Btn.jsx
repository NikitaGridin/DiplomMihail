import React from 'react'
import { Link } from 'react-router-dom';

const Btn = ({text,outline,to}) => {
  return (
        <Link to={to} className={`rounded-lg py-6 w-full md:py-4 md:text-xl block font-semibold text-center text-3xl xl:text-xl ${outline ? 'border border-black text-black' : 'bg-black text-white'}`}>{text}</Link>
    )
}

export default Btn;