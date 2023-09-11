import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../config'
import Container from '../../components/Container'
import GroupsList from '../../components/Groups/GroupsList'

const SchoolGroups = () => {
    let {schoolId} = useParams()
    let [school, setSchool] = useState()

    useEffect(() => {
        axios.get(`${config.API_URL}/schools/${schoolId}?_embed=groups&_expand=city`)
            .then(res => setSchool(res.data))
    }, [schoolId])

  return (
    <Container>
        <GroupsList title={school && school.name + ' - ' + school.city.name} groups={school && school.groups} />
    </Container>
  )
}

export default SchoolGroups