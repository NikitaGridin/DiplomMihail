import axios from 'axios'
import React from 'react'

const ModalAddCategory = ({setModal,getCategories}) => {
    const styles = {
        labes: "block text-gray-700 text-sm font-bold mb-2 block text-gray-700 text-sm font-bold mb-2",
        input: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
        btn: "bg-black w-full text-white font-bold text-xm rounded-lg py-4",
    }

    const [name,setName] = React.useState('');

    const changeInfo = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            const {data} = await axios.post(
                `${import.meta.env.VITE_APP_API_URL}categories.php`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            getCategories();
            alert(data);
            setModal(false);
        } catch (error) {
            alert(error.response.data);
        }
    };

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
                <div className=""> 
                    <button 
                    className={styles.btn}
                    type="button"
                    onClick={()=>changeInfo()}
                    >
                    Добавить
                    </button>
                </div>
            </form>
    </div>
  )
}

export default ModalAddCategory