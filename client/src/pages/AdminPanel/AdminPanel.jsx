import React from 'react'
import axios from 'axios'
import ReservationsCart from './ReservationsCart'

const AdminPanel = () => {
  const [reservations, setReservations] = React.useState([]);

  const getResertvations = async (e) => {
    try {    
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}reservations.php`,
      )
      setReservations(data);
    } catch (error) {
      // alert(error?.response?.data)
    }
  }

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

  const acceptReservation = (id)=>{
    fetch(`${import.meta.env.VITE_APP_API_URL}acceptReservation.php?id=${id}`, {
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

  React.useEffect(()=>{
    getResertvations();
    },[])
  return (
    <div className='mx-6'>
    <h1 className='mb-10 text-3xl font-semibold'>Все бронирования</h1>
    <div className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4'>
    {reservations.map((e, i)=>{
          return <ReservationsCart key={i} id={e.id} date={e.date} startTime={e.start_time} finishTime={e.finish_time} status={e.status} number={e.number} cancelReservation={cancelReservation} acceptReservation={acceptReservation}/>
        })}
    </div>
    </div>
  )
}

export default AdminPanel;