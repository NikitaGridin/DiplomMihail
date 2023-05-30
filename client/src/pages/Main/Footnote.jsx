import React from 'react'
import Btn from './Btn';
import M_4 from '../../assets/m_4.png'

const Footnote = () => {
  return (
    <div className='py-6 px-6 pb-10 bg-[#F6F6F6] lg:grid lg:grid-cols-2 lg:gap-10 mb-[120px] xl:mb-[220px]'>
        <div>
            <h1 className='mb-6 text-4xl font-semibold xl:text-5xl'>Желаете забронировать столик?</h1>
            <div className='text-2xl font-light mb-8'>Для бронирования столика заполните простую форму ниже. Мы свяжемся с вами в ближайшее время для подтверждения брони. <br /><br />
            Ждем вас в нашем ресторане "Аромат"!
            </div>
            <div className='md:w-1/2'>
            <Btn text="Забронировать столик" outline={false} to="/reservation"/>
            </div>
            <div className='mt-10 text-lg'>Обращаем ваше внимание, что бронирование столика не является обязательным, но позволяет вам избежать очереди и гарантировать наличие свободного места в ресторане в выбранное вами время.</div>
        </div>
        <div className='hidden lg:block h-full'>
            <img src={M_4} alt="restaraunt" className='w-full h-full object-cover rounded-xl'/>
        </div>
    </div>
  )
}

export default Footnote;