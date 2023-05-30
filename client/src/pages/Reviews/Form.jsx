import React from 'react';
import Btn from './Btn';
import User from '../../store/user';

import Star from '../../assets/star.svg'
import StarEmpty from '../../assets/starEmpty.svg'

const Form = ({getReviews}) => {
  const [text, setText] = React.useState('');
  const [grade, setGrade] = React.useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('user_id', User.user);
    formData.append('text', text);
    formData.append('grade', grade);

    fetch(`${import.meta.env.VITE_APP_API_URL}reviews.php`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data.success){
        alert(data.message);
        getReviews();
        setText('');
        setGrade(0);
      }
      else{
        alert(data.message);
      }
    })
    .catch(error => console.error(error))
  }

  const handleTextChange = (event) => setText(event.target.value);
  const handleGradeChange = (value) => setGrade(value);

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= grade;
    const starImage = filled ? Star : StarEmpty;
    stars.push(
      <div
        key={i}
        onClick={() => handleGradeChange(i)}
        className="mr-2 focus:outline-none"
      >
        <img src={starImage} alt={filled ? "filled star" : "empty star"} className="w-10 xl:w-6 cursor-pointer" />
      </div>
    );
  }

  return (
    <form action="" className="xl:col-span-2" onSubmit={handleSubmit}>
      <h1 className="font-bold text-5xl mb-10">Оставьте отзыв</h1>
      <div className="flex items-center mb-6 transition-all">{stars}</div>
      <textarea name="text" id="text" value={text} onChange={handleTextChange} className='w-full border h-48 border-black rounded-lg mb-5 text-4xl xl:text-lg xl:w-1/2 p-2' placeholder='Введите текст'></textarea>
      <br />
      <Btn />
    </form>
  );
};

export default Form;