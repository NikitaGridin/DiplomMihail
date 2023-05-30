import React from 'react'
import axios from 'axios'
import User from '../../store/user'
import Btn from './Btn'
import Select from './Select'
import BusyTime from './BusyTime'
import { Link } from 'react-router-dom';

const Form = () => {
  const [date, setDate] = React.useState('')
  const [start, setStart] = React.useState('')
  const [finish, setFinish] = React.useState('')
  const [table, setTable] = React.useState('')
  const [seats, setSeats] = React.useState()
  const [tables, setTables] = React.useState()
  const [availableTimes, setAvailableTimes] = React.useState([])
  const [finishTimeOptions, setFinishTimeOptions] = React.useState([])

  const handleDateChange = async (e) => {
    setDate(e.target.value)
    getBusyTime(e.target.value)
  }
  
 const getBusyTime = async (selectedDate) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}a.php`,
        {
          params: {
            date: selectedDate
          },
        });

      setAvailableTimes(data)
    } catch (error) {
      alert(error?.response?.data)
    }
  }

  const getFreeTables = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}booked_times.php`,
        {
          params: {
            date,
            startTime: start,
            finishTime: finish
          },
        })
        
      const tableNumbers = data.map(({ number }) => number)
      setTables(tableNumbers)
    } catch (error) {
      clearAll()
      alert(error?.response?.data)  
    }
  }

  React.useEffect(() => {
    if(date && start && finish) {
      getFreeTables()
    }
  }, [date, start, finish])

  const handleChangeStart = (e) => {
    const startTime = e.target.value
    setStart(startTime)
    const filteredOptions = times.filter(time => time > startTime)
    setFinishTimeOptions(filteredOptions)
  }

  const handleChangeFinish = (e) => setFinish(e.target.value)
  const handleChangetable = (e) => setTable(e.target.value)
  const handleChangeSeats = (e) => setSeats(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('user_id', User.user)
      formData.append('date', date)
      formData.append('start_time', start)
      formData.append('finish_time', finish)
      formData.append('table_id', table)
      formData.append('seats', seats)
      
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}reservations.php`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      alert(data)
      clearAll()
    } catch (error) {
      alert(error?.response?.data)
    }
  }

  const clearAll = () =>{
    setDate('')
    setTables('')
    setStart('')
    setFinish('')
  }

  const seatsAll = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const times = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
  ]

  return (
    <div>
      <h1 className="text-5xl font-bold mb-10">Бронирование столика</h1>
      {
      User.isAuth &&
      <>
      <div className="text-3xl font-light mb-20">
        Заполните форму бронирования столика что бы забронировать место в нашем
        ресторане на удобное для вас время.
      </div>
      <form className="xl:col-span-2 grid grid-cols-1 gap-10 mb-16">
        <input type="date" value={date} className='text-4xl xl:text-xl xl:w-1/3' onChange={handleDateChange} />
        <div>
          {date && 
            <>
              <BusyTime title="Занятое время" array={availableTimes} message="Бронирований нет" />
              <div className='grid grid-cols-1 mt-10'>
                <Select title='Время начала' array={times} onChange={handleChangeStart} />
                <Select title='Время окончания' array={finishTimeOptions} onChange={handleChangeFinish} />
                <Select title='Кол-во посетителей' array={seatsAll} onChange={handleChangeSeats} />
              </div>
            </>
          }
          {tables && 
            <Select title='Свободный столик' array={tables} onChange={handleChangetable} />
          }
        </div>
        <Btn title="Оформить заявку" handleSubmit={handleSubmit} />
      </form>
      </>
      }
      {
        !User.isAuth &&
        <>
          <div className="text-3xl font-light mb-20">Что бы забронировать столик, нужно авторизоваться!</div>
          <Link to='/log-in' className='block bg-black text-white py-7 text-center rounded-md text-3xl font-bold'>Авторизоваться</Link>        
        </>
      }
    </div>
  )
}

export default Form