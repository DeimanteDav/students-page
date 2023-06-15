import React, { useEffect, useState } from 'react'
import axios from 'axios'
 
const AddStudent = ({setStudents}) => {

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [city, setCity] = useState('')
  const [group, setGroup] = useState('')
 
  const [citiesOption, setCitiesOption] = useState([])
  const [groupsOption, setGroupsOption] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/cities')
      .then(response => setCitiesOption(response.data))
  })

  useEffect(() => {
    axios.get('http://localhost:3000/groups')
      .then(response => setGroupsOption(response.data))
  })

  function addStudentHandler(e) {
    e.preventDefault()
    axios.post('http://localhost:3000/students', {
        name,
        surname,
        cityId: city ? Number(city) : 1,
        groupId: group ? Number(group) : 1,
    })
      .then(response => {
        if (response.status === 201) {
          setName('')
          setSurname('')
          setCity('')
          setGroup('')
          setStudents(prevState => {
            let newStudent = [...prevState]
            newStudent.unshift(response.data)
            return newStudent
          })
        }
    })
  }


  return (
    <form className='add-student' onSubmit={addStudentHandler}>
        <h3>Add a student</h3>
        <div>
            <label htmlFor='name'>First name</label>
            <input id='name' value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>

        <div>
            <label htmlFor='surname'>Last name</label>
            <input id='surname' value={surname} onChange={(e) => setSurname(e.target.value)}></input>
        </div>

        <div>
            <label htmlFor='city'>City</label>
            <select id='city' value={city} onChange={(e) => setCity(e.target.value)}>{citiesOption.map(city => <option value={city.id} key={city.id}>{city.name}</option>)}</select>
        </div>

        <div>
            <label htmlFor='group'>Group</label>
            <select id='group' value={group} onChange={(e) => setGroup(e.target.value)}>{groupsOption.map(group => <option value={group.id} key={group.id}>{group.title}</option>)}</select>
        </div>

        <button type='submit'>ADD</button>
    </form>
  )
}

export default AddStudent