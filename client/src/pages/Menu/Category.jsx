import React from 'react'

const Category = ({id,name,handleClick}) => {
  return (
    <div 
    className='mr-5'
    onClick={()=>handleClick(id)}
    >
        {name}
    </div>
  )
}

export default Category