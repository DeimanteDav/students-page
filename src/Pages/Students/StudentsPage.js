import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Students.css'
import AddStudent from '../../components/Students/AddStudent'
import config from '../../config'
import StudentsList from '../../components/Students/StudentsList'
import Container from '../../components/General/Container'
import LoadingBar from '../../components/General/LoadingBar'
import useFetchData from '../../hooks/useFetchData'

const StudentsPage = () => {
  const [search, setSearch] = useState('')
  const [foundStudents, setFoundStudents] = useState([])

  const [timer, setTimer] = useState(null)

  let {data: students, setData: setStudents, loading} = useFetchData(`${config.API_URL}/students?_sort=id&_order=desc`)

  function searchHandler(e) {
    setSearch(e.target.value)

    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
    setTimer(
      setTimeout(() => {
        axios.get(`${config.API_URL}/students?q=${search}`)
          .then(response => {
            setFoundStudents(response.data)
          })
          .catch((e) => console.log(e))
      }, 1000)
    )
  }

  if (loading) {
    return <LoadingBar />
  }

  return (
    <Container>
      <div className='students-page'>
        <h1>Students</h1>
        <AddStudent add setStudents={setStudents}/>
        
        <div className='find'>
          <input
            placeholder='Find students'
            value={search}
            onInput={searchHandler}
          />
        </div>
        
        <StudentsList students={search ? foundStudents : students}></StudentsList>
      </div>
    </Container>
  )
}

export default StudentsPage


