import axios from 'axios'
import React from 'react'

const ModalChangeCategory = ({setModal,id,getItems,getCategories}) => {
    const styles = {
        labes: "block text-gray-700 text-sm font-bold mb-2 block text-gray-700 text-sm font-bold mb-2",
        input: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
        btn: "bg-black w-full text-white font-bold text-xm rounded-lg py-4",
    }

    const [name,setName] = React.useState('');

    const getInfo = async() =>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_APP_API_URL}oneCategory.php?id=${id}`);
            setName(data[0].name);
          } catch (error) {
            alert(error?.response?.data)  
          }
    }

    const changeInfo = async () => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}changeCategory.php`,formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            getItems();
            getCategories();
            alert('Успешно обновлен!');
            setModal(false);
        } catch (error) {
            alert(error?.response?.data);
        }
    };

    React.useEffect(()=>{
        getInfo();
    },[])

  return (
    <div className='fixed flex justify-center items-center w-full h-screen bg-black/30 top-0 left-0 z-20' onClick={()=>setModal(false)}>
            <form className="bg-white px-8 pt-6 pb-8 mb-4 w-1/3 rounded"  onClick={e => e.stopPropagation()}>
                <div className="mb-4">
                    <label 
                    className={styles.labes}
                    htmlFor="name"
                    >
                    Название:
                    </label> 
                    <input 
                    className={styles.input} 
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </div>

                <div className="mb-6"> 
                    <button 
                    className={styles.btn}
                    type="button"
                    onClick={()=>changeInfo()}
                    >
                    Сохранить
                    </button>
                </div>
            </form>
    </div>
  )
}

export default ModalChangeCategory