import React from 'react'
import DifBlock from './DifBlock'
import Btn from './Btn'
import M_3 from '../../assets/m_3.png'
const Diference = () => {
  return (
    <div className='h-auto lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-28 xl:grid-cols-10 items-center mb-[160px] mx-6'>
        <div className='xl:col-span-5'>
            <h1 className='mb-20 text-4xl font-semibold xl:text-5xl'>Чем мы отличаемся?</h1>
            <div>
                <DifBlock />
                <DifBlock />
                <DifBlock />
            </div>
            <Btn text="Посмотреть отзывы" outline={true} to="/reviews"/>
        </div>
        <div className='w-full hidden lg:block xl:col-span-5'>
        <img src={M_3} alt="man" className='w-full object-cover'/>
        </div>
    </div>
  )
}

export default Diference;