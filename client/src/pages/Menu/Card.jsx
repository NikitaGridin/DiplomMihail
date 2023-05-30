import React from 'react'
import { Link } from 'react-router-dom';
import User from '../../store/user'
import axios from 'axios';
import Del from '../../assets/del.svg'
import Edit from '../../assets/edit.svg'

const Card = ({img,title,price,id,items,setItems,handleModal}) => {
  const handleDelete = async()=>{
  const confirmed = window.confirm('Вы уверены, что хотите удалить этот товар?');
  if (confirmed) {
    try {
      const {data} = await axios.delete(`${import.meta.env.VITE_APP_API_URL}dishes.php?id=${id}`);
      alert(data);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      alert(error?.response?.data)  
    }
  }
}
  return (
    <div className='relative'>
    <Link to={`/dish-page/${id}`} className='block w-full pb-10 shadow-lg rounded-2xl border hover:-translate-y-2 transition-all hover:shadow-xl'>
        <img src={img} alt="product" className='w-full h-[600px] mb-8 rounded-2xl object-cover md:h-[500px] lg:h-[600px] xl:h-[540px]'/>
        <div className='mb-8 mx-6 text-4xl xl:text-2xl xl:mb-4'>{title}</div>
        <div className='mx-6 text-3xl font-light xl:text-xl'>{price} Рублей</div>
    </Link>
    {
        User.role === 'admin' &&
        <div className='absolute top-5 right-5 bg-white rounded-xl p-3'>
            <div onClick={()=>handleDelete()} className='mb-5 cursor-pointer'><img src={Del} alt="delete" className='w-8'/></div>
            <div onClick={()=>handleModal(id)} className='cursor-pointer'><img src={Edit} alt="edit" className='w-8'/></div>
        </div>
      }
    </div>
      
  )
}

export default Card