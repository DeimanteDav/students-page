import React from 'react'

const StudentData = ({label, data}) => {
  return (
    <div>
        <label htmlFor={data}>{label}</label>
        <span id={data}>
            {data ? (
                <span >{data}</span> 
            ) : (
                <span className='error'>{data} not given</span>
            )}
        </span>
    </div> 
  )
}

export default StudentData