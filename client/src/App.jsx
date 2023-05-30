import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';

import Main from './pages/Main';
import Menu from './pages/Menu';
import SignIn from './pages/SignIn';
import LogIn from './pages/LogIn';

import {observer} from 'mobx-react-lite';

import User from './store/user'
import Account from './pages/Account/';
import AdminPanel from './pages/AdminPanel';
import Reviews from './pages/Reviews';
import Reservation from './pages/Reservation';
import AboutUs from './pages/AboutUs/';
import DishPage from './pages/DishPage/DishPage';

const App = observer(() => {

  const [loading, setLoading] = React.useState(false);

  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  React.useEffect(() => {
    const myCookieValue = getCookie('user')
    if(myCookieValue){
    setLoading(true);
    fetch(`${import.meta.env.VITE_APP_API_URL}checkAuth.php?key=${myCookieValue}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if(data.success){
          const decodedData = atob(myCookieValue)
          const userData = JSON.parse(decodedData) 
          User.setUser(userData.id)  
          User.setRole(userData.role)  
        }
        else{
            document.cookie.split(';').forEach(c => {
              document.cookie = c
                .replace(/^ +/, '')
                .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
            })
        }
    })
    .finally(()=>{
      setLoading(false);
    })
  }
  }, [])

  return (
    <Router>
      <div className='font-nunito'>
        <Header />
        {loading && ( 
        <div className="flex items-center justify-center bg-white z-10 absolute w-full h-screen top-0 left-0">  
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>   
        )}
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reviews" element={<Reviews />} />
          {!User.isAuth && <Route path="/sign-in" element={<SignIn />} />}
          {!User.isAuth && <Route path="/log-in" element={<LogIn />} /> }
          {User.isAuth &&(
          <>
          <Route path="/account" element={<Account />} />  
          {User.role === "admin" ? <Route path="/admin-panel" element={<AdminPanel />} /> : ''}
          </>
          )
          }
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/dish-page/:id" element={<DishPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<Main />} />
        </Routes>
        
      <Footer />
      </div>
    </Router>
  );
})

export default App;