import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import { useLocation } from 'react-router-dom';
import DekstopMenu from './DekstopMenu'
import MobileMenu from './MobileMenu';
import BurgerBtn from './BurgerBtn';


const Header = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    setMenu(false);  
  }, [location.pathname]);

  const [menu, setMenu] = React.useState(false);

  return(
  <nav className='mx-6 mt-5 mb-20 sm:mt-10 sm:flex sm:justify-between sm:mb-32'>
      <Link to="/main" className='flex items-center justify-center text-5xl mb-5 sm:m-0'><img src={logo} alt="logo" className='mr-2 w-24 sm:mr-5 sm:w-16'/>АРОМАТ</Link>

      <BurgerBtn menu={menu} setMenu={setMenu}/>

      <DekstopMenu />

      {menu && <MobileMenu setMenu={setMenu}/>}
  </nav>
  )
    };

export default Header;