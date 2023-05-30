import React from 'react'
import axios from "axios";

import ReservationsCart from './ReservationsCart'

import User from '../../store/user'

const Reservations = () => {

const [reservations, setReservations] = React.useState([]);
const [message, setMessage] = React.useState();

const getResertvations = async () =>{
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}reservations.php`,
        {
          params: {
            id:User.user
          },
        }
      );

      setReservations(data);
    } catch (error) {
      setMessage(error.response.data);
    }

}

React.useEffect(()=>{
getResertvations();
},[])

const cancelReservation = (id)=>{
  fetch(`${import.meta.env.VITE_APP_API_URL}cancelReservation.php?id=${id}`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    if(data.success){
      getResertvations();
    }
    else{
      alert("Ошибка!");
    }
  })
  .catch(error => console.error(error))
}

  return (
    <div className='xl:col-span-2'>
      <h1 className='mt-10 text-4xl font-semibold mb-10'>Информация о бронях</h1>
      {message}
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4'>
        {reservations.map((e, i)=>{
          return <ReservationsCart key={i} id={e.id} date={e.date} startTime={e.start_time} finishTime={e.finish_time} status={e.status} number={e.number} cancelReservation={cancelReservation}/>
        })}
    </div>
    </div>
  )
}

export default Reservations;