import React from 'react'

const Block = ({text,img,reverse}) => {
    const [description, rest] = text.split('<br />')
  return (
    <div className={`lg:flex lg:h-[600px] justify-between gap-10 mb-[150px] ${reverse ? 'flex-row-reverse': ''}`}>
        <div className='text-2xl text-justify leading-10 mb-10 lg:text-xl lg:leading-loose'>
        {description}<br /> <br />
        {rest}
      </div> 
        <img src={img} alt="img" className='h-[200px] w-full object-cover rounded-xl lg:w-1/2 lg:h-full'/>
        <hr className='w-full bg-black h-[1px] mt-12 lg:hidden'/>
    </div>
  )
}

export default Block