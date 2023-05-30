import React from 'react'
import { useNavigate } from 'react-router-dom';

import User from '../../store/user'

import Input from './Input'
import Btn from './Btn'

import Key from '../../assets/key.svg'
import Arrow from '../../assets/arrow.svg'

const Secure = () => {
const [modal,setModal] = React.useState(false);
const [dirty, setDirty] = React.useState(false);

const [oldPassword,setOldPassword] = React.useState('');
const [newPassword,setNewPassword] = React.useState('');

const navigate = useNavigate();

const handleOldPasswordChange = (e) => {
  setOldPassword(e.target.value);
  setDirty(true);
}
const handleNewPasswordChange = (e) => {
  setNewPassword(e.target.value);
  setDirty(true);
}

const handleSubmit = () => {
  const formData = new FormData();
  formData.append('id', User.user);
  formData.append('old_password', oldPassword);
  formData.append('new_password', newPassword);

  fetch(`${import.meta.env.VITE_APP_API_URL}changePassword.php`, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    setModal(false);
  })
  .catch(error => console.error(error))
}
const logout = () => {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  User.logout();
  navigate('/main', { replace: true });
}
  return (
    <div className='border-black border-t-[1px] xl:border-l-[1px] xl:border-t-0 xl:pl-10'>
      <h1 className='mt-10 text-4xl font-semibold xl:mt-0'>Безопасность</h1>
      <div className='mt-14 flex items-center cursor-pointer' onClick={()=>setModal(true)}>
        <img src={Key} alt="key" className='w-14 xl:w-10'/>
        <div className='ml-4 xl:ml-6'>
          <p className='text-4xl xl:text-xl'>Пароль</p>
          <p className='text-3xl xl:text-xl'>**********</p>
        </div>
        <img src={Arrow} alt="arrow" className='w-4 ml-20 xl:w-3'/>
      </div>

    {modal &&
    <div className='fixed top-0 left-0 w-full h-screen bg-black/20 z-20 flex items-center' onClick={()=>setModal(false)}>
      <div className='bg-white p-5 rounded-xl w-full xl:w-1/2 mx-auto' onClick={(e) => e.stopPropagation()}>
          <Input 
              label="Старый пароль"
              type="password"
              name="old_password"
              id="old_password"
              value={oldPassword}  
              onChange={handleOldPasswordChange}/>
           <Input 
              label="Новый пароль"
              type="password"
              name="new_password"
              id="new_password"
              value={newPassword}  
              onChange={handleNewPasswordChange}/>
            <Btn dirty={dirty} handleSubmit={handleSubmit}/>
      </div>
    </div>
    }
    <button onClick={()=>logout()}>Выйти</button>

    </div>
  )
}

export default Secure;