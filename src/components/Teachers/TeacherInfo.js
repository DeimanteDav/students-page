import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const TeacherInfo = ({teacher, deleteClassHandler}) => {
    const age = (date) => {
        let today = new Date();
        let birthDate = new Date(date)
        let age = today.getFullYear() - birthDate.getFullYear() -
                (today.getMonth() < birthDate.getMonth() || 
                (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()));
        return age;
      }
      
  return (
    <div className='info'>
        <h2>Teacher info</h2>
        {teacher.profile ? 
        <img style={{width: '50%'}}  src={teacher.profile}></img> 
        : <Avatar sx={{width: '50%', height: '50%', aspectRatio: 1 / 1}} variant='rounded'/>}
        
        <div className='list'>
            <label htmlFor='name'>First Name</label>
            <span id='name'>{teacher.name ? teacher.name : 'Not specified'}</span>
        </div>

        <div className='list'>
            <label htmlFor='surname'>Last Name</label>
            <span id='surname'> {teacher.surname ? teacher.surname : 'Not specified'}</span>
        </div>

        <div className='list'>
            <label htmlFor='age'>Age</label>
            <span id='age'>{isNaN(age(teacher.date)) ? 'Not specified' : age(teacher.date)}</span>
        </div>

        <div className='list'>
            <label htmlFor='school'>School</label>
            {teacher.school ? (
                <Link id='school' to={`/schools/${teacher.school && teacher.school.id}`}>{teacher.school.name}</Link>
            ) : (
                <span>Not specified</span>
            )}
        </div>

        <div className='list'>
            <h4>Classes:</h4>
            {teacher.classes && teacher.classes.length > 0 ? (
                <ul className='classes'>
                {teacher.classes.map(oneClass => {
                    return (
                    <>
                        <li key={oneClass.id}>{oneClass.name}</li>
                        <button type='button' onClick={(e) => deleteClassHandler(oneClass.id, e)}>X</button>
                    </>
                    )
                })} 
                </ul> 
            ) : (
                <span>No classes are assigned to this teacher</span>
            )}
        </div>

    </div>
  )
}

export default TeacherInfo