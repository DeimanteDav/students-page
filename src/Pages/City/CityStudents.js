import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../config'
import Container from '../../components/General/Container'
import StudentsList from '../../components/Students/StudentsList'

const CityStudents = () => {
    let {cityId} = useParams()
    let [city, setCity] = useState([])

    useEffect(() => {
        axios.get(`${config.API_URL}/cities/${cityId}?_embed=students`)
            .then(res => setCity([res.data]))
    }, [cityId])
  

  return (
    <Container>
        <StudentsList title={city[0] && city[0].name} students={city[0] && city[0].students}/>
    </Container>
  )
}

export default CityStudents