import React from 'react'

import burger from '../../assets/burger.svg';
import close from '../../assets/close.svg';

const BurgerBtn = ({menu, setMenu}) => {
    const handleMenu = () =>{
        setMenu(!menu);
      }
  return (
    <button className="lg:hidden block w-14 md:w-10 mx-auto sm:mr-0 sm:z-30" onClick={() => handleMenu()}>
    {!menu &&
    <img src={burger} alt="burger" className='w-full'/>
    }
    {menu &&
    <img src={close} alt="close" className='w-full'/>
    }
    </button> 
  )
}

export default BurgerBtn;