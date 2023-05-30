import React from 'react'

import Input from './Input'
import Btn from './Btn'

import User from '../../store/user'

const Info = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [photo, setPhoto] = React.useState(null);

  const [photoView, setPhotoView] = React.useState('');
  
  const [dirty, setDirty] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(()=>{
    setLoading(true);
    fetch(`${import.meta.env.VITE_APP_API_URL}infoUser.php?id=${User.user}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if(data.success){
      setName(data.data[0].name)
      setSurname(data.data[0].surname)
      setEmail(data.data[0].email)
      setPhone(data.data[0].phone)
      setPhotoView(import.meta.env.VITE_APP_API_URL + data.data[0].img);
    }
    })
    .catch(error => console.error(error))
    .finally(()=>{
      setLoading(false);
    })
  },[])



  const handleNameChange = (event) => {
    setName(event.target.value);
    setDirty(true);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
    setDirty(true);
  };

  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setDirty(true);
  }
  
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setDirty(true);
  }
  
  const handleImgChange = (event) => {
    setPhoto(event.target.files[0]);
    setDirty(true);
    setPhotoView(URL.createObjectURL(event.target.files[0])); 
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('id', User.user);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('phone', phone);
    if (photo) {
    formData.append('img', photo);  
  }
    fetch(`${import.meta.env.VITE_APP_API_URL}users.php`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => console.error(error))
  }
  return (
    <div>
          {loading && ( 
        <div className="flex items-center justify-center bg-white z-10 absolute w-full h-screen top-0 left-0">  
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>   
        )}
      <h1 className='mb-12 text-4xl font-semibold'>Личные данные</h1>
      <div className='md:grid md:grid-cols-2 gap-10 xl:grid-cols-2'>
      <div className='relative xl:col-span-1 h-[460px]'>
      <img src={photoView} alt="avatar" className='rounded-xl object-cover w-full mb-10 h-full'/>
        <input id='avatar' type="file" className='absolute top-0 right-0 opacity-0 h-0 w-0' onChange={handleImgChange}/>
        <label 
              htmlFor='avatar'
              className='absolute right-4 bottom-4 text-2xl bg-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-200 focus-within:outline-none focus-within:ring-2 focus-withин:ring-offset-2 focus-within:ring-gray-500 cursor-pointer'>
              Изменить аватар
        </label>
      </div>
      <div className='xl:col-span-1'>
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
                type="text"
                name="email"
                id="email"
                value={email}  
                onChange={handleEmailChange}  
            />
            <Input 
                label="Номер телефона"
                type="text"
                name="phone"
                id="phone"
                value={phone}  
                onChange={handlePhoneChange}  
            />
      <Btn dirty={dirty} handleSubmit={handleSubmit}/>
      </div>
    </div>
    </div>
  )
}

export default Info;