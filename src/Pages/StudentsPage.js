import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Students.css'
import AddStudent from '../components/AddStudent'
import { Link } from 'react-router-dom'
import config from '../config'

const StudentsPage = () => {
  const [students, setStudents] = useState([])

  const [search, setSearch] = useState('')
  const [foundStudents, setFoundStudents] = useState([])


  useEffect(() => {
    axios.get(`${config.API_URL}/students?_sort=id&_order=desc`)
      .then(response => setStudents(response.data))
  }, [])


  function searchHandler(e) {
    setSearch(e.target.value)
    axios.get(`${config.API_URL}/students?q=${search}`)
      .then(response => setFoundStudents(response.data))
      .catch((e) => console.log(e))
  }

  let studentsList = (search ? foundStudents : students).map(student => {
    return (
      <li key={student.id}>
        <Link to={`/students/${student.id}`}>{student.name} {student.surname}</Link>
      </li>
    ) 
  })


  return (
    <div className='students-page'>
      <h1>Students</h1>
      <AddStudent setStudents={setStudents}/>
      
      <div className='find'>
        <input
          placeholder='Find students'
          value={search}
          onInput={searchHandler}
        />
      </div>
      <ul className='students-list'>{studentsList}</ul>
    </div>
  )
}

export default StudentsPage


