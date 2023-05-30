import React from 'react'
import { Link } from 'react-router-dom';

import User from '../../store/user';

const DekstopMenu = () => {
  return (
        <ul className='hidden lg:flex items-center'>
            <li className='mr-10 text-base font-light'><Link to="/about-us">О нас</Link></li>
            <li className='mr-10 text-base font-light'><Link to="/menu">Меню</Link></li>
            <li className='mr-10 text-base font-light'><Link to="/reservation">Бронирование</Link></li>
            <li className='mr-10 text-base font-light'><Link to="/reviews">Отзывы</Link></li>
            {User.isAuth && (
            <li className='mr-10 text-base font-light'><Link to="/account">Личный кабинет</Link></li>
            )}
            {!User.isAuth && (
              <li className='mr-10 text-base font-light'><Link to="/log-in">Авторизация/Регистрация</Link></li>
            )
            }
            {User.role === "admin" && 
            <li className='text-base font-light'><Link to="/admin-panel">Админ панель</Link></li>}

        </ul>
  )
}

export default DekstopMenu;
