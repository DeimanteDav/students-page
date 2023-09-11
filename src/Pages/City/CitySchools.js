import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../config'
import SchoolsList from '../../components/Schools/SchoolsList'
import Container from '../../components/Container'

const CitySchools = () => {
    let {cityId} = useParams()
    const [city, setCity] = useState([])

    useEffect(() => {
      axios.get(`${config.API_URL}/cities/${cityId}?_embed=schools`)
        .then(res => setCity([res.data]))
    }, [cityId])   
    

  return (
    <Container>
      <SchoolsList cityName={city[0] && city[0].name} cities={city} />
    </Container>
  )
}

export default CitySchools