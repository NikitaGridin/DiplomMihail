import React from 'react'

const Select = ({onChange,array,title}) => {
const classname = 'text-4xl border-b border-black mb-20 xl:text-xl xl:mb-5';
  return (
    <select
    defaultValue={""}
    onChange={onChange}
    className={classname}
  >
    <option value="" defaultValue disabled>{title}</option>
    {array.map((e,i)=><option key={i} value={e}>{e}</option>)}
  </select>
  )
}

export default Select;
