import React from 'react'
import D_M from '../../assets/d_m.svg'
const DifBlock = () => {
  return (
    <div className='flex items-start mb-20 lg:mb-10 xl:mb-20'>
        <img src={D_M} alt="img" className='mr-10 w-60 md:w-20'/>
        <div className='col-span-8'>
            <h1 className='text-2xl font-semibold mb-5 lg:mb-3'>Наша еда - это творчество</h1>
            <div className='text-justify text-xl font-medium lg:font-light'>Мы не просто готовим блюда, мы создаем уникальные кулинарные шедевры, которые заставят вас испытать незабываемые вкусовые ощущения</div>
        </div>
    </div>
  )
}

export default DifBlock;