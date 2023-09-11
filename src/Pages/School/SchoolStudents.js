import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../config'
import Container from '../../components/Container'
import StudentsList from '../../components/Students/StudentsList'

const SchoolStudents = () => {
    let {schoolId} = useParams()
    let [school, setSchool] = useState()

    useEffect(() => {
        axios.get(`${config.API_URL}/schools/${schoolId}?_embed=students&_expand=city`)
            .then(res => setSchool(res.data))
    }, [schoolId])

  return (
    <Container>
        <StudentsList title={school && school.name + ' - ' + school.city.name} students={school && school.students} />
    </Container>
  )
}

export default SchoolStudents