import React from 'react'
import phone from '../../assets/phone.svg'
import email from '../../assets/email.svg'
import time from '../../assets/time.svg'
import geo from '../../assets/geo.svg'

const Map = () => {
  return (
    <div className='mx-6'>
        <h1 className='mb-6 text-4xl font-semibold xl:text-5xl'>Где мы находимся?</h1>
        <iframe
            className='w-full h-[460px] rounded-xl mb-14 md:h-[660px]'
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d35484.10806071607!2d43.46642155!3d56.230438799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1684730691303!5m2!1sru!2sru"></iframe>
            <div className='w-full lg:grid lg:grid-cols-2 min-[1400px]:grid-cols-4'>
                <div className='flex mb-12 items-center text-xl font-medium w-full lg:text-lg'><img src={phone} alt="phone" className='w-8 mr-5'/>Телефон: +7 (913) 456-78-90</div>
                <div className='flex mb-12 items-center text-xl font-medium w-full lg:text-lg'><img src={email} alt="email" className='w-8 mr-5'/>Почта: info@restaurant.com</div>
                <div className='flex mb-12 items-center text-xl font-medium w-full lg:text-lg'><img src={time} alt="time" className='w-8 mr-5'/>Адрес: ул. Ленина, дом 10, кв. 25, г. Новосибирск</div>
                <div className='flex mb-12 items-center text-xl font-medium w-full lg:text-lg'><img src={geo} alt="geo" className='w-8 mr-5'/>Время работы: Пн-Вс: 11:00 - 23:00</div>
            </div>
    </div>
  )
}

export default Map