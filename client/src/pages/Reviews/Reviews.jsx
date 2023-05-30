import React from 'react'

import User from '../../store/user';

import ReviewsCart from './ReviewsCart'
import Form from './Form';

const Reviews = () => {
  const [reviews, setReviews] = React.useState([]);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);


  const getReviews = () =>{
    setLoading(true);
    fetch(`${import.meta.env.VITE_APP_API_URL}reviews.php`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if(data.success){
        setReviews(data.data);
        setError('');
      }
      else{
        setError(data.message);
      }
    })
    .catch(error => console.error(error))
    .finally(() => {
      setLoading(false);
    });
  }

  React.useEffect(()=>{
    getReviews();
  },[])

  return (
    <div className='mx-6'>
      <h1 className='font-semibold text-4xl mb-20'>Отзывы посетителей!</h1>
      <div className='grid grid-cols-1 gap-20 md:grid-cols-2 xl:grid-cols-2 mb-20  min-[1400px]:grid-cols-4'>
        {error}
        {loading && ( 
        <div className="flex items-center justify-center bg-white z-10 absolute w-full h-screen top-0 left-0">  
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>   
        )}
        {reviews.map((e,i) =>{
          return (<ReviewsCart 
            key={i}
            img={import.meta.env.VITE_APP_API_URL + e.img}
            name={e.name}
            grade={e.grade}
            text={e.text}
            id={e.id}
            reviews={reviews}
            setReviews={setReviews}
            userId={e.user_id}
          />
          )
        })}
      </div>
      {User.isAuth &&
      <Form getReviews={getReviews}/>
      }
    </div>
  )
}

export default Reviews;