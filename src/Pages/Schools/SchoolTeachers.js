import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../config'
import axios from 'axios'
import Container from '../../components/General/Container'
import TeachersList from '../../components/Teachers/TeachersList'

const SchoolTeachers = () => {
    let {schoolId} = useParams()
    let [school, setSchool] = useState()

    useEffect(() => {
        axios.get(`${config.API_URL}/schools/${schoolId}?_embed=teachers&_expand=city`)
            .then(res => setSchool(res.data))
    }, [schoolId])

  return (
    <Container>
        <TeachersList title={school && school.name + ' - ' + school.city.name} teachers={school && school.teachers} />
    </Container>
  )
}

export default SchoolTeachers