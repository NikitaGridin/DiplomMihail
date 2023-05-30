import axios from 'axios'
import React from 'react'

const ModalAddDish = ({setModal,categories,getItems}) => {
    const styles = {
        labes: "block text-gray-700 text-sm font-bold mb-2 block text-gray-700 text-sm font-bold mb-2",
        input: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
        btn: "bg-black w-full text-white font-bold text-xm rounded-lg py-4",
    }

    const [name,setName] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [img,setImg] = React.useState(null);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category_id", category);
            formData.append("img", img);

            const {data} = await axios.post(`${import.meta.env.VITE_APP_API_URL}dishes.php`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            getItems();
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

                <div className="mb-4">
                    <label
                    className={styles.labes}
                    htmlFor="price"
                    >
                    Цена:
                    </label>
                    <input 
                    className={styles.input}
                    type="number" 
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    />
                </div>  
                <div className='grid grid-cols-4 gap-5'>
                {categories.map((e,i) => {
                    return (
                        <div
                        className={`cursor-pointer border py-2 text-center font-bold rounded-lg ${category === e.id ? 'bg-black text-white' : 'bg-white'}`}
                        key={Math.random()}
                        onClick={()=>setCategory(e.id)}
                        > 
                        {e.name}
                        </div>   
                    )
                    })}
                </div>
                <div className="mb-4">
                    <label
                    className={styles.labes}
                    htmlFor="price"
                    >
                    Описание:
                    </label>
                    <textarea
                    className={styles.input}
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    ></textarea>
                </div>
                <input type="file" onChange={(e) => setImg(e.target.files[0])} />
                <div className="mb-6"> 
                    <button 
                    className={styles.btn}
                    type="button"
                    onClick={()=>handleSubmit()}
                    >
                    Добавить
                    </button>
                </div>
            </form>
    </div>
  )
}

export default ModalAddDish