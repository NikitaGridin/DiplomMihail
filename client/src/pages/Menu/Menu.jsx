import React from 'react'
import Card from './Card'
import axios from 'axios'
import Modal from './Modal'
import User from '../../store/user';
import ModalAddDish from './ModalAddDish';
import ModalAddCategory from './ModalAddCategory';
import ModalChangeCategory from './ModalChangeCategory';

const Menu = () => {
  const [items, setItems] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [pages, setPages] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [modal,setModal] = React.useState(false);
  const [itemId,setItemId] = React.useState(null);
  const [selectCategoryId, setSelectCategoryId] = React.useState(null);

  const [addDishModal, setAddDishModal] = React.useState(false);
  const [addCategoryModal, setAddcategoryModal] = React.useState(false);
  const [modalChangeCategory, setModalChangeCategory] = React.useState(false);

  const sorts = [
    {"type": "price","order":"asc", "text":"По цене ↑"},
    {"type": "price","order":"desc","text":"По цене ↓"},
  ]

  const [sortActive,setSortActive] = React.useState(0);
  const [categoryActive,setCategoryActive] = React.useState(-1);

  const [category, setCategory] = React.useState('');
  const [sort, setSort] = React.useState('');
  const [order, setOrder] = React.useState('');

  const getItems = async () => {
    try {
      setLoading(true);
      let url = `${import.meta.env.VITE_APP_API_URL}dishes.php?category=${category}&sort=${sort}&order=${order}&page=${currentPage}`;

      const { data } = await axios.get(url);
      setItems(data.data);
      const countPages = Array.from({ length: data.pages }, (_, index) => index + 1);
      setPages(countPages);
      setLoading(false);
      setMessage('');
    } catch (error) {
      setItems([])
      setMessage(error.response.data);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}categories.php`
      );
      setCategories(data);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  const handleChangeCategory = (id,i) => {
    setCategory(id);
    setCategoryActive(i)
  };

  const handleChangeSort = (sort, order, i) => {
    setSort(sort);
    setOrder(order);
    setSortActive(i);
  };

  const allCategory = () => {
    setCategory('');
    setCategoryActive(-1)
  };

  const handleModal = (id) =>{
    setModal(true);
    setItemId(id);
  }
  const delCategory = async(id)=>{
    const confirmed = window.confirm('Вы уверены, что хотите удалить эту категорию, все товары данной категории будут удалены?');
    if (confirmed) {
      try {
        const {data} = await axios.delete(`${import.meta.env.VITE_APP_API_URL}categories.php?id=${id}`);
        alert(data);
        getCategories();
        getItems();
      } catch (error) {
        alert(error?.response?.data)  
      }
    }
  }

  const changeCategory = (id)=>{
    setSelectCategoryId(id);
    setModalChangeCategory(true)
  }

  React.useEffect(() => {
    getItems();
  }, [category, sort, order, currentPage]);

  React.useEffect(() => {
    getCategories();
  }, []);
  
  return (
    <div className="mx-6">
        {/* {loading && ( 
        <div className="flex items-center justify-center bg-white z-10 absolute w-full h-screen top-0 left-0">  
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>   
        )} */}
             {
          User.role === 'admin' &&
          <button
            className='bg-green-600 text-center text-white font-bold text-4xl rounded-full py-2 px-4 mb-5 cursor-pointer'
            onClick={()=>setAddcategoryModal(true)}>
           +</button>
      }
      {
        addCategoryModal && 
        <ModalAddCategory  setModal={setAddcategoryModal} getCategories={getCategories} categories={categories}/>
      }
      {
        modalChangeCategory &&
        <ModalChangeCategory  setModal={setModalChangeCategory} getCategories={getCategories} getItems={getItems} id={selectCategoryId}/>
      }
      {modal && <Modal setModal={setModal} getItems={getItems} categories={categories} id={itemId}/>}
      <div className="mb-20 lg:flex lg:items-center lg:mb-10">
        <div className='text-3xl mb-5 lg:mb-0 lg:mr-5 xl:text-xl'>Фильтровать: </div>
        <div className='flex w-full overflow-scroll xl:overflow-auto'>
          <div
            className={`py-4 px-8 rounded-2xl cursor-pointer text-2xl font-bold me-6 transition-all xl:text-lg xl:py-3 xl:px-6 ${categoryActive === -1 ? 'bg-black text-white': 'border border-black'}`}
            onClick={()=>allCategory()}>Все</div>
          {categories.map((e, i) => (
            <div className='flex me-6 items-center'> 
              <div 
                key={Math.random()}
                className={`py-4 px-8 rounded-2xl cursor-pointer text-2xl font-bold transition-all xl:text-lg xl:py-3 xl:px-6 ${categoryActive === i ? 'bg-black text-white': 'border border-black'}`}
                onClick={()=>handleChangeCategory(e.id,i)}
              >
                {e.name}
              </div>
              {
                User.role === 'admin' &&
                <div
                className='cursor-pointer ml-1 text-2xl text-white bg-red-500 px-2 rounded-full'
                onClick={()=>delCategory(e.id)}
                >×</div>
              }
               {
                User.role === 'admin' &&
                <div
                className='cursor-pointer ml-1 text-2xl text-white bg-green-500 px-2 rounded-full'
                onClick={()=>changeCategory(e.id)}
                >...</div>
              }
            </div>
            ))}
      </div>
      </div>
      <div className="mb-20 lg:flex lg:items-center">
      <div className='text-3xl mb-5 lg:mb-0 lg:mr-5 xl:text-xl'>Сортировать: </div>
        <div className='flex w-full overflow-scroll xl:overflow-auto'>
        {
          sorts.map((e,i)=>{
            return(
            <div key={Math.random()} onClick={()=> handleChangeSort(e.type,e.order,i)} className={`py-4 px-8 rounded-2xl cursor-pointer text-2xl font-bold me-6 transition-all xl:text-lg xl:py-3 xl:px-6 ${sortActive === i ? 'bg-black text-white': 'border border-black'}`}>
              {e.text}
            </div>
            )
          })
        }
        </div>
      </div>
      {
          User.role === 'admin' &&
          <button
            className='bg-red-600 text-center text-white font-bold text-4xl rounded-full py-2 px-4 mb-5 cursor-pointer'
            onClick={()=>setAddDishModal(true)}>
           +</button>
      }
      {
        addDishModal && 
        <ModalAddDish  setModal={setAddDishModal} getItems={getItems} categories={categories}/>
      }

      {message && <h1 className='text-center text-4xl font-bold py-10'>{message}</h1>} 
      <div className="grid grid-cols-1 gap-32 md:grid-cols-2 md:gap-10 xl:grid-cols-3 min-[1400px]:grid-cols-4 mb-20 min-[1400px]:gap-20">
        {items.map((e, i) => (
          <Card
            key={Math.random()}
            title={e.name}
            price={e.price}
            img={import.meta.env.VITE_APP_API_URL + e.img}
            id={e.id}
            items={items}
            setItems={setItems}
            handleModal={handleModal}
          />
        ))}
      </div>
      <div className='flex justify-center'>
     {pages &&
        pages.map((e,i)=> <div key={Math.random()} onClick={() => setCurrentPage(e)} className={`rounded-full py-6 px-8 font-bold cursor-pointer text-3xl transition-all me-8 xl:py-3 xl:px-5 xl:text-lg xl:mr-4 ${currentPage === e ? 'bg-black text-white' : 'bg-gray-200'}`}>{e}</div>)
      }
      </div>
    </div>
  );
};

export default Menu