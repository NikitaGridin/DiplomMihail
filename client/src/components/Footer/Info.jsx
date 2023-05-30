import React from 'react'

const Info = () => {
  return (
    <div>
        <div className='mb-10 text-6xl font-semibold lg:mb-8 md:text-4xl'>Контакты</div>
        <div className='mb-16 grid sm:grid-cols-2 lg:grid-cols-1'>
            <p className='mb-10 text-3xl font-semibold lg:mb-5 md:text-xl md:font-light'>Адрес: ул. Ленина, дом 10, кв. 25, г. Новосибирск</p>
            <p className='mb-10 text-3xl font-semibold lg:mb-5 md:text-xl md:font-light'>Почта: info@restaurant.com</p>
            <p className='mb-10 text-3xl font-semibold lg:mb-5 md:text-xl md:font-light'>Телефон: +7 (913) 456-78-90</p>
            <p className='text-3xl font-semibold md:text-xl md:font-light'>Время работы: Пн-Вс: 11:00 - 23:00</p>
        </div>
    </div>
  )
}

export default Info;
