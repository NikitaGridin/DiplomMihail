import React from 'react'

const Btn = ({handleSubmit,title}) => {
  return (
    <button className='bg-black text-white py-7 w-full text-center rounded-md text-3xl font-bold' onClick={(event)=>handleSubmit(event)}>
        {title}
    </button>
    )
}

export default Btn;