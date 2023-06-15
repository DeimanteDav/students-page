import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom'
import config from '../config.js'

const Teacher = () => {
  let {teacherId} = useParams()
  const [teacher, setTeacher] = useState({})

  const [allClasses, setAllClasses] = useState([])

  const [isEditing, setIsEditing] = useState(false)
  const [classDeleting, setClassDeleting] = useState(false)
  const [addingClass, setAddingClass] = useState(false)

  const [selectedClass, setSelectedClass] = useState('default')

  useEffect(() => {
    axios.get(`${config.API_URL}/teachers/${teacherId}?_embed=classes`)
      .then(res => setTeacher(res.data))
  }, [teacherId, classDeleting, addingClass])


  useEffect(() => {
    axios.get(`${config.API_URL}/classes`)
    .then(res => {
      if (res.status === 200) {
          let filteredClasses = res.data.filter(oneClass => {
            return oneClass.teacherId != Number(teacherId)
        })
        setAllClasses(filteredClasses)
      }
    })
  }, [teacherId, addingClass])


  const deleteClassHandler = (id, e) => {
    e.preventDefault()
    axios.patch(`${config.API_URL}/classes/${id}`, {
      teacherId: ""
    })
    .then(res => {
      console.log(res);
      if (res.status === 200) {
          setClassDeleting(prevState => !prevState)
      }
    })
  }
console.log(selectedClass)

  const addClassHandler = (e) => {
    e.preventDefault()
    
    axios.patch(`${config.API_URL}/classes/${selectedClass}`, {
      teacherId: Number(teacherId)
    })
      .then(response => {
        if (response.status === 200) {
          setSelectedClass('default')
          setAddingClass(prevState => !prevState)
          setTeacher(prevState => {
              return {...prevState, classes: [...prevState.classes, response.data]}
          })
        }
      })
  }
  console.log(new Date());
  console.log(new Date(teacher.date));

  const editTeacherHandler = (e) => {
    e.preventDefault()

    axios.put(`${config.API_URL}/teachers/${teacherId}`, {
      name: teacher.name,
      surname: teacher.surname,
      date: teacher.date,
      id: Number(teacherId),
    })
      .then(response => {
        if (response.status === 200) {
          setIsEditing(false)
        }
      })

  }

  const deleteTeacherHandler = () => {
    axios.delete(`${config.API_URL}/teachers/${teacherId}`)
    .then(response => {
      if (response.statusText === 'OK') {
          return redirect('/')
      }
  })
  }

  const age = (date) => {
    let today = new Date();
    let birthDate = new Date(date)
    let age = today.getFullYear() - birthDate.getFullYear() -
            (today.getMonth() < birthDate.getMonth() || 
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()));
    return age;
  }

  return (
    <>
    <h2>Teacher info</h2>
    {isEditing ?
      <form className='teacher editing-teacher' onSubmit={editTeacherHandler}>
        <div>
          <label htmlFor='name'>First Name</label>
          <input
            id='name'
            type='text'
            value={teacher.name}
            onChange={(e) => setTeacher(prevState => ({...prevState, name: e.target.value}))}
          />
        </div>
        
        <div>
          <label htmlFor='surname'>Last Name</label>
          <input
            id='surname'
            type='text'
            value={teacher.surname}
            onChange={(e) => setTeacher(prevState => ({...prevState, surname: e.target.value}))}
          />
        </div>
        
        <div>
          <label htmlFor='date'>Date</label>
          <input
            id='date'
            type='date'
            value={teacher.date}
            onChange={(e) => setTeacher(prevState => ({...prevState, date: e.target.value}))}
          />
        </div>

        <div>
          <h4>Classes:</h4>
          {teacher.classes.map((oneClass, i) => {
            return (
            <div className='classes-editing' key={oneClass.id}>
              <input
                type='text'
                value={oneClass.name}
                onChange={(e) => setTeacher(prevState => {
                  let newState = {...prevState}
                  newState.classes[i].name = e.target.value
                  return newState
                })}
              />
              <button type='button' onClick={(e) => deleteClassHandler(oneClass.id, e)}>X</button>
            </div>
            )
          })}
        </div>
        <button type='submit'>Save</button>
      </form> :

    
    <div className='teacher'>
      <div>
        <label htmlFor='name'>First Name</label>
        <span id='name'>{teacher.name}</span>
      </div>

      <div>
        <label htmlFor='surname'>Last Name</label>
        <span id='surname'> {teacher.surname}</span>
      </div>

      <div>
        <label htmlFor='age'>Age</label>
        <span id='age'>{age(teacher.date)}</span>
      </div>

      <h4>Classes:</h4>
      <ul className='classes'>
        {teacher.classes && teacher.classes.map(oneClass => {
        return <li key={oneClass.id}>{oneClass.name}</li>
      })}
      </ul>

      <form onSubmit={addClassHandler} className='add-classes-form'>
            <label htmlFor='add-classes'>Add Classes</label>

            <select 
              id='add-classes'
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value='default' disabled>Select a class</option>
              {allClasses.map(oneClass => {
                return <option key={oneClass.id} value={oneClass.id}>{oneClass.name}</option>
              })}
            </select>

            <button type='submit'>ADD</button>
        </form>

      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={deleteTeacherHandler}>Delete</button>
    </div>}
    </>

  )
}

export default Teacher