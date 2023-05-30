import React from 'react'

const Btn = ({ dirty,handleSubmit }) => {
  return (
    <button 
      disabled={!dirty}
      className='bg-black text-white py-7 w-full text-center rounded-md text-2xl font-bold disabled:opacity-30 disabled:cursor-not-allowed xl:py-4 xl:text-xl'
      onClick={()=>handleSubmit()}>
      Изменить
    </button>
  )
}

export default Btn;