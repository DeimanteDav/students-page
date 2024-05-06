import React, { useState } from 'react'
import config from '../../config'
import { useParams } from 'react-router-dom'
import LoadingBar from '../../components/General/LoadingBar'
import Container from '../../components/General/Container'
import AddSchool from '../../components/Schools/AddSchool'
import SchoolForm from '../../components/Schools/SchoolForm'
import SchoolTabs from '../../components/Schools/SchoolTabs'
import useFetchData from '../../hooks/useFetchData'


const School = () => {
  let {schoolId} = useParams()
  const [isEditing, setIsEditing] = useState(null)

  let {data: school, loading} = useFetchData(`${config.API_URL}/schools/${schoolId}?_expand=city&_embed=teachers`, 'get', [isEditing])

  if (loading) {
    return <LoadingBar />
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