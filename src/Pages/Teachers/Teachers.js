import React from 'react'
import config from '../../config'
import TeachersList from '../../components/Teachers/TeachersList'
import Container from '../../components/General/Container'
import AddTeacher from '../../components/Teachers/AddTeacher'
import styles from './Teachers.module.scss'
import useFetchData from '../../hooks/useFetchData'
import LoadingBar from '../../components/General/LoadingBar'

const Teachers = () => {
  const {data: teachers, setData: setTeachers, loading} = useFetchData(`${config.API_URL}/teachers?_sort=id&_order=desc`)

  if (loading) {
    return <LoadingBar />
  }

  return (
    <Container>
      <AddTeacher add setTeachers={setTeachers} className={styles['add-teacher']} />      
      <TeachersList teachers={teachers} header />
    </Container>
  )
}

export default Teachers