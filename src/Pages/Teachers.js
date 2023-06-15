import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Teachers.css'
import config from '../config'

const Teachers = () => {
    const [teachers, setTeachers] = useState([])

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        axios.get(`${config.API_URL}/teachers?_sort=id&_order=desc`)
            .then(res => setTeachers(res.data))
    }, [])


    const createTeacherHandler = (e) => {
        e.preventDefault()
        axios.post(`${config.API_URL}/teachers`, {
          name,
          surname,
          date
        })
            .then(response => {
                if (response.status === 201) {
                    setName('')
                    setSurname('')
                    setDate('')
                    setTeachers(prevState => {
                        let newState = [...prevState]
                        newState.unshift(response.data)
                        return newState
                    })
                }
            })
    }
 
  return (
    <>
    <form onSubmit={createTeacherHandler} className='add-teacher'>
        <h3>Add a teacher</h3>
        <div>
            <label htmlFor='name'>First Name</label>
            <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
            <label htmlFor='surname'>Last Name</label>
            <input type='text' id='surname' value={surname} onChange={(e) => setSurname(e.target.value)}></input>
        </div>
        <div>
            <label htmlFor='date'>Date</label>
            <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
        </div>

        <button type='submit'>Add</button>
    </form>

    <h3>Teachers</h3>
    <ul className='teachers'>
        {teachers.map(teacher => {
            return (
                <li key={teacher.id}>
                    <Link to={`/teachers/${teacher.id}`}>{teacher.name} {teacher.surname}</Link>
                </li>
            )
        })}

    </ul>
    </>
  )
}

export default Teachers