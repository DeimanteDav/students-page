import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import config from '../../config'
import SchoolsList from '../../components/Schools/SchoolsList'
import StudentsList from '../../components/Students/StudentsList'
import Container from '../../components/General/Container'
import { Typography } from '@mui/material'

const City = () => {
    let {cityId} = useParams()
    const [city, setCity] = useState([])

    useEffect(() => {
      axios.get(`${config.API_URL}/cities/${cityId}?_embed=schools&_embed=students`)
        .then(res => setCity([res.data]))
    }, [cityId])


  return (
    <Container>
      <Typography variant='h5' component='h1' mb={3}>{city[0] && city[0].name}</Typography>

      <div>
        <SchoolsList cities={city} />
        <Link to={`/cities/${cityId}/schools`}>Look more..</Link>
      </div>

      <div>
        <StudentsList header students={city[0] && city[0].students} />
        {(city[0] && city[0].students.length > 0) && <Link to={`/cities/${cityId}/students`}>Look more..</Link>}
      </div>
    </Container>
    
  )
}

export default City