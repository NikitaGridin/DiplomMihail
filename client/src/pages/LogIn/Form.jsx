import React from 'react'

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Btn from './Btn';
import Input from './Input';

import User from '../../store/user'

const Form = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      fetch(`${import.meta.env.VITE_APP_API_URL}auth.php`, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if(data.success){
          const cookies = data.cookie;
          const decodedData = atob(cookies)
          const userData = JSON.parse(decodedData) 
          User.setUser(userData.id)  
          User.setRole(userData.role)  
          document.cookie = `user=${cookies}; path=/`;
          navigate('/main', { replace: true });
        }
        else{
            alert(data.message)
        }
      })
      .catch(error => console.error(error))
    }
  
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    

  return (
    <form action="" className='xl:col-span-2' onSubmit={handleSubmit}>
        <h1 className='font-bold text-5xl mb-10'>Авторизация</h1>
        <div className='text-2xl font-light mb-10 md:mb-20'>Пожалуйста, введите свои данные для входа.</div>

            <div className='grid grid-cols-1 gap-20 md:grid-cols-2 mb-16 xl:gap-6'>
            <Input 
                label="Email"
                type="email"
                name="email"
                id="email"
                value={email}  
                onChange={handleEmailChange}  
            />
            
            <Input 
                label="Пароль"
                type="password"
                name="password"
                id="password"
                value={password}  
                onChange={handlePasswordChange}  
            />
             
            </div>
            <Btn />
            <Link to='/sign-in' className='text-lg font-medium'>Ещё не зарегестрированы?</Link>
    </form>
  )
}

export default Form;