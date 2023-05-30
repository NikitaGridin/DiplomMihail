import React from 'react'

const BusyTime = ({title,array,message}) => {
  return (
    <div>
        <h1 className='text-5xl xl:text-3xl'>{title}</h1>
        <div className='grid grid-cols-1 gap-10 mb-3 xl:grid-cols-4'>
        {array.length > 0 &&
          array.map((e,i)=>(
            <div key={i} className='text-4xl mt-5 xl:text-lg'>
              {'Стол № ' + e.table_number}  
              {e.intervals.map((time,i)=> <div key={i} className='mt-2 font-extralight text-4xl xl:text-lg'>{time}</div>)}
            </div> 
          ))}
          </div>
        {
        array.length === 0 &&
        <div className='text-3xl font-thin xl:text-xl xl:font-light'>{message}</div>
        }
    </div>
  )
}

export default BusyTime;