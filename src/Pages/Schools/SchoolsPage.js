import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config'
import AddSchool from '../../components/Schools/AddSchool'
import Container from '../../components/General/Container'
import SchoolsList from '../../components/Schools/SchoolsList'

const SchoolsPage = () => {
  const [cities, setCities] = useState([])

  const [isAddingSchool, setIsAddingSchool] = useState(false)

  useEffect(() => {
    axios.get(`${config.API_URL}/cities?_embed=schools`)
      .then(res => setCities(res.data))
  }, [isAddingSchool])
 
  return (
    <Container>
      <AddSchool add setAddingSchool={setIsAddingSchool} />
      <SchoolsList divider cities={cities} />
    </Container>
  )
}

export default SchoolsPage