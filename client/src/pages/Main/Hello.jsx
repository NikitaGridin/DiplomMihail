import React from 'react'
import Btn from './Btn';
import M_1 from '../../assets/m_1.png'
const Hello = () => {
  return (
    <div className='xl:grid xl:grid-cols-2 xl:gap-20 mb-[160px] mx-6'>
        <div className='flex flex-col justify-end'>
            <h1 className='mb-10 text-4xl font-semibold xl:text-5xl'>Лучшая еда <br /> что вы пробовали</h1>
            <div className='text-3xl font-light mb-10 xl:text-2xl'>
                У нас вы найдете разнообразное меню, состоящее из блюд на любой вкус - от классических до экзотических.
                Все наши блюда готовятся из свежих и качественных ингредиентов с использованием традиционных и современных технологий.
                Наша команда профессиональных поваров и официантов сделает все возможно
            </div>
            <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
                <Btn text="Посмотреть каталог" outline={false} to="/menu" />
                <Btn text="Забронировать столик" outline={true} to="/reservation"/>
            </div>
        </div>
        <div className='hidden xl:block'> <img src={M_1} alt="food" className='w-full h-full object-cover rounded-lg'/></div>
    </div>
  )
}

export default Hello;