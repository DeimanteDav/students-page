import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config'
import { useParams } from 'react-router-dom'
import LoadingBar from '../../components/LoadingBar'
import Container from '../../components/Container'
import AddSchool from '../../components/Schools/AddSchool'
import SchoolForm from '../../components/Schools/SchoolForm'
import SchoolTabs from '../../components/Schools/SchoolTabs'
import useFetchData from '../../hooks/useFetchData'


const School = () => {
  let {schoolId} = useParams()

  const [school, setSchool] = useState(null)
  const [isEditing, setIsEditing] = useState(null)
  

  useEffect(() => {
    axios.get(`${config.API_URL}/schools/${schoolId}?_expand=city&_embed=teachers`)
      .then(res => setSchool(res.data))
  }, [isEditing])

  // let {data: school} = useFetchData()

  if (!school) {
    return (<LoadingBar></LoadingBar>)
  }

  return (
    <Container>
      {!isEditing ? (
        <SchoolForm setIsEditing={setIsEditing} school={school} />
      ) : (
        <AddSchool edit school={school} setIsEditing={setIsEditing} schoolId={schoolId}/>
      )}

      <SchoolTabs school={school} />
    </Container>
    
  )
}

export default School