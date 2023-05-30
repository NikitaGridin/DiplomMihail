import axios from 'axios';
import React from 'react'
import { useParams } from "react-router-dom";

const DishPage = () => {
  const { id } = useParams()
  const [message, setMessage] = React.useState('');
  const [info, setInfo] = React.useState([]);

  const getDish = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API_URL}getOneDish.php?id=${id}`;

      const { data } = await axios.get(url);
      setInfo(data[0]);
    } catch (error) {
      setMessage('Товар не найден');
    }
  };
  React.useEffect(()=>{
    if (!/^\d+$/.test(id)) {
      setMessage('Товар не найден');
    }
    getDish();
  },[])
  return (
    <div>
      {message && <h1 className='text-center text-4xl font-bold'>{message}</h1>}
      {!message &&
      <div className={`mx-6 gap-20 grid grid-cols-2`}>
        <img src={`${import.meta.env.VITE_APP_API_URL}` + info.img} alt="img" className='rounded-xl h-[620px] object-cover w-full' />
        <div>
          <h1 className='text-5xl font-semibold mb-10'>{info.name}</h1>
          <div className='text-2xl font-light mb-8'>{info.description}</div>
          {/* <div className='text-2xl font-light mb-8'>250 ккал (100 грамм)</div>
          <div className='flex mb-8'>
            <div className='border border-black py-2 px-5 rounded-full me-11'>Белки: 20</div>
            <div className='border border-black py-2 px-5 rounded-full me-11'>Белки: 20</div>
            <div className='border border-black py-2 px-5 rounded-full'>Белки: 20</div>
          </div> */}
          <div className='text-2xl font-light'>{info.price} руб.</div>
        </div>
      </div>
      }
      <div>
        
      </div>
    </div>
  )
}

export default DishPage