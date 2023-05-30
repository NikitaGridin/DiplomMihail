import React from 'react'

const ReservationsCart = ({id,date,startTime,finishTime,status,number,cancelReservation}) => {
  return (
    <div className='bg-[#F4F4F4] p-5 rounded-xl'>
        <p className='text-2xl font-medium mb-5'>{date}</p>
        <p className='text-lg font-medium mb-5'>Время начала: {startTime}</p>
        <p className='text-lg font-medium mb-5'>Время окончания: {finishTime}</p>
        <p className='text-lg font-medium mb-5'>Номер столика: {number}</p>
        <div className='text-lg font-medium mb-5 flex items-center'> <div className={`mr-2 w-10 h-10 rounded-full ${status === 'ожидает'? 'bg-yellow-400' : status === 'отклонён' ? 'bg-red-600' : 'bg-green-600'}`}></div> {status}</div>
        {status != 'отклонён' ? <div onClick={()=>cancelReservation(id)}>Отменить бронь</div> : ''}
    </div>
  )
}
export default ReservationsCart;