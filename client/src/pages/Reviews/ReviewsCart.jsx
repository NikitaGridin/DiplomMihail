import React from 'react'
import User from '../../store/user'

import Star from '../../assets/star.svg'
import StarEmpty from '../../assets/starEmpty.svg'
import axios from 'axios'

const ReviewsCart = ({name, grade, img, text, id,reviews,setReviews,userId}) => {
  const gradeInt = Math.floor(grade);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < gradeInt) {
      stars.push(<img src={Star} alt="star" key={i} className="w-8 mr-2 xl:w-5"/>);
    } else {
      stars.push(<img src={StarEmpty} alt="star" key={i} className="w-8 mr-2 xl:w-5"/>);
    }
  }
    const handleDelete = async()=>{
      const confirmed = window.confirm('Вы уверены, что хотите удалить отзыв?');
      if (confirmed) {
        try {
          const {data} = await axios.delete(`${import.meta.env.VITE_APP_API_URL}reviews.php?id=${id}`);
          alert(data);
          setReviews(reviews.filter(review => review.id !== id));
        } catch (error) {
          alert(error?.response?.data)  
        }
      }
    }

  return (
    <div className='bg-[#F9F9F9] rounded-xl relative'>
      <div className='h-[400px] lg:h-[540px] xl:h-[600px] min-[1400px]:h-[400px]'>
        <img src={img} alt="avatar" className='rounded-xl h-full w-full object-cover'/>
      </div>
      <div className='relative p-5'>
        <div className=''>
          <div className='text-4xl font-semibold mb-8 lg:text-5xl xl:text-2xl xl:mb-5'>{name}</div>
          <div className='text-2xl font-normal line-clamp-5 mb-8 md:text-3xl xl:text-lg'>{text}</div>
        </div>
        <div className=' flex'>
          {stars}
        </div>
      </div>
      {
        User.user === userId &&
        <div onClick={()=>handleDelete()} className='absolute top-3 bg-red-500 text-2xl right-3 text-white rounded-full py-2 px-4 font-bold cursor-pointer'>×</div>
      }
       {
        User.role === 'admin' &&
        <div onClick={()=>handleDelete()} className='absolute top-3 bg-red-500 text-2xl right-3 text-white rounded-full py-2 px-4 font-bold cursor-pointer'>×</div>
      }
    </div>
  )
};

export default ReviewsCart;