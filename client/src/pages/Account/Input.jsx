const Input = ({label, type, name, id, value, onChange}) => {

    const styles = {
        input: 'w-full focus:outline-none border-[#C9C9C9] border-b-[1px] mt-2 pb-2 text-4xl font-normal xl:text-2xl',
        label: 'font-normal text-[#6D6D6D] text-2xl xl:text-lg',
      };

    return (
      <div className="input_row my-10">
        <label htmlFor={id} className={styles.label}>{label}</label>
        <br />
        <input 
          type={type} 
          name={name}  
          id={id}   
          className={styles.input} 
          value={value} 
          onChange={onChange}
        />
      </div> 
    )
  }

  export default Input;