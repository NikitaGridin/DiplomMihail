import React from 'react'
import { Link } from 'react-router-dom';
import User from '../../store/user';

const MobileMenu = ({setMenu}) => {
  return (
    <div className='lg:hidden top-0 left-0 absolute w-full h-screen bg-black/30 z-20' onClick={() => setMenu(false)}>
        <ul className="py-20 text-center px-10 w-full bg-white sm:px-10 sm:py-10" onClick={e => e.stopPropagation()}>
            <li className='font-semibold text-5xl mb-14 sm:text-3xl'><Link to="/about-us">О нас</Link></li>
            <li className='font-semibold text-5xl mb-14 sm:text-3xl'><Link to="/menu">Меню</Link></li>
            <li className='font-semibold text-5xl mb-14 sm:text-3xl'><Link to="/reservation">Бронирование</Link></li>
            <li className='font-semibold text-5xl mb-14 sm:text-3xl'><Link to="/reviews">Отзывы</Link></li>
            {User.isAuth && (
            <li className='font-semibold text-5xl mb-14 sm:text-3xl'><Link to="/account">Личный кабинет</Link></li>
            )}
            {!User.isAuth && (
              <>
              <li className='font-semibold text-5xl mb-14 sm:text-3xl'><Link to="/log-in">Авторизация/Регистрация</Link></li>
              {User.user.role==="admin" ?<li className='text-base font-light'><Link to="/admin-panel">Админ панель</Link></li> : ''}
              </>
            )
            }
        </ul>
  </div>
  )
}

export default MobileMenu;