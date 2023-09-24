import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../config'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import cryptoRandomString from 'crypto-random-string'
import EditButtonsGroup from '../Buttons/EditButtonsGroup'
import useLocalStorage from '../../hooks/useLocalStorage'
import useFetchData from '../../hooks/useFetchData'
 
const AddStudent = ({setStudents, add = false, edit = false, studentId, setIsEditing, student}) => {

  const [name, setName] = useLocalStorage('student-name', (student ? student.name : ''))
  const [surname, setSurname] = useLocalStorage('student-surname', (student ? student.surname : ''))
  const [city, setCity] = useLocalStorage('student-city', (student ? student.cityId : ''))
  const [group, setGroup] = useLocalStorage('student-group', (student ? student.groupId : ''))
  const [school, setSchool] = useLocalStorage('student-school', (student ? student.schoolId : ''))
       
  const [userRole, setUserRole] = useState('')
  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'))
  }, [])

  let {data: groupsOption, error: groupsOptError} = useFetchData(`${config.API_URL}/groups`)

  let {data: citiesOption, error: citiesOptError} = useFetchData(`${config.API_URL}/cities`)


  let {data: schoolsOption, error: schoolsOptError} = useFetchData(`${config.API_URL}/cities/${city}?_embed=schools`, {}, 'get', [city])

  function addStudentHandler(e) {
    e.preventDefault()
    axios.post(`${config.API_URL}/students`, {
      name,
      surname,
      cityId: city ? Number(city) : '',
      schoolId: school ? Number(school) : '',
      groupId: group ? Number(group) : '',
      code: cryptoRandomString({length: 10, type: 'ascii-printable'})
    })
      .then(response => {
        if (response.status === 201) {
          setName('')
          setSurname('')
          setCity('')
          setSchool('')
          setGroup('')
          setStudents(prevState => {
            let newStudent = [...prevState]
            newStudent.unshift(response.data)
            return newStudent
          })
        }
    })
  }

  const editStudentHandler = (e) => {
    e.preventDefault()
    axios.put(`${config.API_URL}/students/${studentId}`, {
      name,
      surname,
      groupId: group ? Number(group) : '',
      cityId: city ? Number(city) : '',
      schoolId: school ? Number(school) : '',
      groupId: group ? Number(group) : '',
      id: Number(studentId),
    })
        .then(response => {
            if (response.status === 200) {
              setName('')
              setSurname('')
              setCity('')
              setSchool('')
              setGroup('')
              setIsEditing(false)
              localStorage.setItem('student-name', null)
              localStorage.setItem('student-surname', null)
              localStorage.setItem('student-city', null)
              localStorage.setItem('student-group', null)
              localStorage.setItem('student-school', null)
            }
        })

    // student.grades.forEach(grade => {
    //     axios.patch(`${config.API_URL}/grades/${grade.id}`, {
    //         updatedDate: new Date(),
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 setIsEditing(false)
    //             }
    //         })
    // })
  }
  
  
  
  return (
    userRole == 'administrative' && (
      <form className='add-student' onSubmit={add ? addStudentHandler : editStudentHandler}>
      {add && <h3>Add a student</h3>}
        <TextField 
          label='First name'
          size='small'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField 
          label='Last name'
          size='small'
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />


        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Group</InputLabel>
          <Select
            value={group}
            label='Group'
            onChange={(e) => setGroup(e.target.value)}
          >
            {/* {groupsOption && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )} */}
            {groupsOption ? (
              groupsOption.map(group => {
                return <MenuItem key={group.id} value={group.id}>{group.title}</MenuItem>
              })
            ) : (
              <MenuItem>{groupsOptError}</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">City</InputLabel>
          <Select
            value={city}
            label='City'
            onChange={(e) => setCity(e.target.value)}
          >
            {/* {citiesOption && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )} */}
            {citiesOption ? (
              citiesOption.map(city => {
                return <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
              })
            ) : (
              <MenuItem>{citiesOptError}</MenuItem>
            )}
          </Select>
        </FormControl>

        {city && (
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">School</InputLabel>
            <Select
              value={school}
              label='School'
              onChange={(e) => setSchool(e.target.value)}
            >
              {/* {schoolsOption && (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              )} */}
              {schoolsOption.schools ? (
                  schoolsOption.schools.map(school => {
                    return <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                  })
              ) : (
                <MenuItem>{schoolsOptError}</MenuItem>
              )}
            </Select>
          </FormControl>
        )}

        {edit ? (
          <EditButtonsGroup
            cancelClickHandler={() => setIsEditing(false)}
          /> 
        ) : (
          <Button variant='contained' type='submit' size='small'>Add</Button>
        )}
      </form>
    )
  )
}

export default AddStudent