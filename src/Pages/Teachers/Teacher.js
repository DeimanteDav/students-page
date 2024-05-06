import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../config.js'
import Container from '../../components/General/Container.js'
import TeacherForm from '../../components/Teachers/TeacherForm.js'
import AddTeacher from '../../components/Teachers/AddTeacher.js'
import useFetchData from '../../hooks/useFetchData.js'
import LoadingBar from '../../components/General/LoadingBar.js'



const Teacher = () => {
  let {teacherId} = useParams()

  const [allClasses, setAllClasses] = useState([])

  const [isEditing, setIsEditing] = useState(false)
  const [classDeleting, setClassDeleting] = useState(false)
  const [addingClass, setAddingClass] = useState(false)


  const {data: teacher, setData: setTeacher, loading} = useFetchData(`${config.API_URL}/teachers/${teacherId}?_embed=classes&_expand=school`, 'get', [teacherId, classDeleting, addingClass, isEditing])
  
  const {data: schoolsOptions} = useFetchData(`${config.API_URL}/schools?_expand=city`)

  useEffect(() => {
    axios.get(`${config.API_URL}/classes`)
    .then(res => {
      if (res.status === 200) {
          let filteredClasses = res.data.filter(oneClass => {
            return oneClass.teacherId !== Number(teacherId)
        })
        setAllClasses(filteredClasses)
      }
    })
  }, [teacherId, addingClass, classDeleting])


  function deleteClassHandler(id, e) {
    e.preventDefault()
    axios.patch(`${config.API_URL}/classes/${id}`, {
      teacherId: ""
    })
      .then(res => {
        if (res.status === 200) {
            setClassDeleting(prevState => !prevState)
        }
      })
  }

  if (loading) {
    return <LoadingBar />
  }
  
  return (
    <Container>
      {isEditing ? (
        <AddTeacher
          edit
          setTeacher={setTeacher}
          teacher={teacher}
          setIsEditing={setIsEditing}
        />
      ) : (
        <TeacherForm
          teacher={teacher}
          setIsEditing={setIsEditing}
          allClasses={allClasses}
          teacherId={teacherId}
          setTeacher={setTeacher}
          deleteClassHandler={deleteClassHandler}
          setAddingClass={setAddingClass}
        />
      )}
    </Container>

  )
}

export default Teacher