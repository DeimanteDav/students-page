import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../config'
import TeachersList from '../components/Teachers/TeachersList'
import Container from '../components/Container'
import AddTeacher from '../components/Teachers/AddTeacher'
import styles from './Teachers.module.scss'

const Teachers = () => {
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
      axios.get(`${config.API_URL}/teachers?_sort=id&_order=desc`)
          .then(res => setTeachers(res.data))
  }, [])


  return (
    <Container>
      <AddTeacher add setTeachers={setTeachers} className={styles['add-teacher']} />      
      <TeachersList teachers={teachers} header />
    </Container>
  )
}

export default Teachers