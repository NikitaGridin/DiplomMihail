import React from 'react'
import { Link } from 'react-router-dom';

const Social = () => {
  return (
    <div className='flex flex-wrap md:flex-nowrap'>
        <Link to="https://vk.com" className='text-3xl mr-7 font-extrabold xl:text-xl'>ВКОНТАКТЕ</Link>
        <Link to="https://www.youtube.com/" className='text-3xl mr-7 font-extrabold xl:text-xl'>ЮТУБ</Link>
        <Link to="https://odnoklassniki.com" className='text-3xl font-extrabold xl:text-xl'>ОДНОКЛАССНИКИ</Link>
  </div>
  )
}

export default Social;