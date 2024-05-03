import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../config.js'
import Container from '../components/Container.js'
import TeacherForm from '../components/Teachers/TeacherForm.js'
import AddTeacher from '../components/Teachers/AddTeacher.js'



const Teacher = () => {
  let {teacherId} = useParams()
  const [teacher, setTeacher] = useState({})

  const [allClasses, setAllClasses] = useState([])

  const [isEditing, setIsEditing] = useState(false)
  const [classDeleting, setClassDeleting] = useState(false)
  const [addingClass, setAddingClass] = useState(false)

  const [schoolsOptions, setSchoolsOptions] = useState([])

  
  useEffect(() => {
    axios.get(`${config.API_URL}/teachers/${teacherId}?_embed=classes&_expand=school`)
    .then(res => setTeacher(res.data))
  }, [teacherId, classDeleting, addingClass, isEditing])
  
// padaryti
  useEffect(() => {
     axios.get(`${config.API_URL}/schools?_expand=city`)
       .then(res => setSchoolsOptions(res.data))
   }, [])
  
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