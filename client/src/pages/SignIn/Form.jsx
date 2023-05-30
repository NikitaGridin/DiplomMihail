import React from 'react'

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Btn from './Btn';
import Input from './Input';

const Form = () => {
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [photo, setPhoto] = React.useState(null);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('img', photo);

      fetch(`${import.meta.env.VITE_APP_API_URL}sign_in.php`, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if(data.success){
            navigate('/log-in', { replace: true });
        }
        else{
            alert(data.message)
        }
      })
      .catch(error => console.error(error))
    }
  
    const handleNameChange = (event) => setName(event.target.value);
    const handleSurnameChange = (event) => setSurname(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePhoneChange = (event) => setPhone(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleImgChange = (event) => setPhoto(event.target.files[0]);

  return (
    <form action="" className='xl:col-span-2' onSubmit={handleSubmit}>
        <h1 className='font-bold text-5xl mb-10'>Регистрация</h1>
        <div className='text-2xl font-light mb-10 md:mb-20'>Заполните форму регистрации, чтобы мы могли обеспечить вам лучшее обслуживание.</div>

            <div className='grid grid-cols-1 gap-20 md:grid-cols-2 mb-16 xl:gap-6'>
            <Input 
                label="Имя"
                type="text"
                name="name"
                id="name"
                value={name}  
                onChange={handleNameChange}  
            />
            <Input 
                label="Фамилия"
                type="text"
                name="surname"
                id="surname"
                value={surname}  
                onChange={handleSurnameChange}  
            />
            <Input 
                label="Email"
                type="email"
                name="email"
                id="email"
                value={email}  
                onChange={handleEmailChange}  
            />
            <Input 
                label="Номер телефона"
                type="tel"
                name="phone"
                id="phone"
                value={phone}  
                onChange={handlePhoneChange}  
            />
            <Input 
                label="Пароль"
                type="password"
                name="password"
                id="password"
                value={password}  
                onChange={handlePasswordChange}  
            />
              <Input 
                label="Фотография"
                type="file"
                name="img"
                id="img"
                onChange={handleImgChange}  
            />
            </div>
            <Btn />
            <Link to='/log-in' className='text-lg font-medium'>Уже зарегестрированы?</Link>
    </form>
  )
}

export default Form;