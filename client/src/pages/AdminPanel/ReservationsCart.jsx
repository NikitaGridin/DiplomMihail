import React from 'react'

const ReservationsCart = ({id,date,startTime,finishTime,status,number,cancelReservation,acceptReservation}) => {
  return (
    <div className='bg-[#F4F4F4] p-5 rounded-xl'>
        <p className='text-2xl font-medium mb-5'>{date}</p>
        <p className='text-lg font-medium mb-5'>Время начала: {startTime}</p>
        <p className='text-lg font-medium mb-5'>Время окончания: {finishTime}</p>
        <p className='text-lg font-medium mb-5'>Номер столика: {number}</p>
        <div className='text-lg font-medium mb-5 flex items-center'> <div className={`mr-2 w-10 h-10 rounded-full ${status === 'ожидает'? 'bg-yellow-400' : status === 'отклонён' ? 'bg-red-600' : 'bg-green-600'}`}></div> {status}</div>
        <div className='w-full grid grid-cols-2 gap-10'>
          <div onClick={()=>acceptReservation(id)} className='text-center bg-green-500 text-white rounded-xl font-bold py-4 cursor-pointer'>Подтвердить</div> 
          <div onClick={()=>cancelReservation(id)} className='text-center bg-red-500 text-white rounded-xl font-bold py-4 cursor-pointer'>Отменить</div> 
        </div>
    </div>
  )
}
export default ReservationsCart;