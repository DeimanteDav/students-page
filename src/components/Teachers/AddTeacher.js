import { Autocomplete, Avatar, Box, Button, IconButton, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import config from '../../config'
import axios from 'axios'
import SnackbarAlert from '../General/SnackbarAlert'
import DeleteIcon from '@mui/icons-material/Delete';
import EditButtonsGroup from '../Buttons/EditButtonsGroup'
import useFetchData from '../../hooks/useFetchData'


const AddTeacher = ({setTeachers, setTeacher, setIsEditing, teacher, className, edit=false, add=false}) => {
  const [name, setName] = useState(teacher ? teacher.name : '')
  const [surname, setSurname] = useState(teacher ? teacher.surname : '')
  const [date, setDate] = useState(teacher ? teacher.date : '')
  const [school, setSchool] = useState(teacher ? teacher.school : null)
  const [profile, setProfile] = useState(teacher ? teacher.profile : '')

  const [alertType, setAlertType] = useState('')  
  const [alertMessage, setAlertMessage] = useState('')


  const [userRole, setUserRole] = useState('')
  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'))
  }, [])    

  let {data: schoolsOptions, error: schoolsOptError} = useFetchData(`${config.API_URL}/schools?_expand=city`)
  
  const randomProfileHandler = (e) => {
      e.preventDefault()
      axios.get('https://randomuser.me/api/')
        .then(response => {
          setProfile(response.data.results[0].picture);
        })
    }

  const createTeacherHandler = (e) => {
      e.preventDefault()
  
      axios.post(`${config.API_URL}/teachers`, {
        name,
        surname,
        date,
        schoolId: school ? school.id : '',
        profile: profile && profile.random.large
      })
        .then(response => {
          if (response.status === 201) {
            setName('')
            setSurname('')
            setDate('')
            setProfile('')
            setSchool(null)
            setTeachers(prevState => {
                let newState = [...prevState]
                newState.unshift(response.data)
                return newState
            })
            setAlertType('success')
            setAlertMessage('You successfully created a teacher!')
          } else {
            setAlertType('error')
          }
        })
    }
  
      
  const editTeacherHandler = (e) => {
    e.preventDefault()

    axios.put(`${config.API_URL}/teachers/${teacher.id}`, {
      name: teacher.name,
      surname: teacher.surname,
      date: teacher.date,
      profile: profile ? profile.large : teacher.profile,
      schoolId: school ? school.id : '',
      id: Number(teacher.id),
    })
      .then(response => {
        if (response.status === 200) {
          setIsEditing(false)
          if (profile) {
            setTeacher(prevState => {
              let newState = {...prevState}
              return {...newState, profile: profile.large}
            })
            setProfile('')
            setAlertType('success')
            setAlertMessage('You successfully edited a teacher!')
          }
        }
      })

    // let {data} = useFetchData(`${config.API_URL}/teachers/${teacher.id}`, {
    //   name: teacher.name,
    //   surname: teacher.surname,
    //   date: teacher.date,
    //   profile: profile ? profile.large : teacher.profile,
    //   schoolId: school ? school.id : '',
    //   id: Number(teacher.id),
    // }, 'put')
  }

  const deleteProfileHandler = () => {
    axios.patch(`${config.API_URL}/teachers/${teacher.id}`, {
      profile: ''
    })
      .then(res => {
        if (res.status === 200) {
            setTeacher(prevState => {
              let newState = {...prevState}
              return {...newState, profile: ''}
            })
        }
      })

  }

  

  const handleClose = () => {
    setAlertType('')
    setAlertMessage('')
  }


  return (
    userRole === 'administrative' && (
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30ch' },
        mt: 4
      }}
      noValidate
      autoComplete="off"
      width={'25ch'}
      className={className}
      onSubmit={add ? createTeacherHandler : editTeacherHandler}
      >
        {add ? (
          <h2>Add a teacher</h2>
        ) : (
          <h2>Teacher info</h2>
        )}
        <TextField
            id="outlined-required"
            label="First Name"
            type="text"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size='small'
        />
        <TextField
            id="outlined-required"
            label="Last Name"
            type="text"
            variant="outlined"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            size='small'
        />
        <TextField
            type="date"
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            size='small'
        />

        {schoolsOptions ? (
          <Autocomplete
            size='small'
            options={schoolsOptions.sort((a, b) => -b.city.name.localeCompare(a.city.name))}
            groupBy={(option) => option.city.name}
            value={school}
            onChange={(event, value) => setSchool(value)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="School" variant="outlined" />}
          />
        ) : (
          <TextField disabled size='small' defaultValue={schoolsOptError}/>
        )}


        {add && <Stack direction='row' spacing={2} alignItems='center' flexWrap='wrap' justifyContent='center'>
            {profile.random && <img alt='teacher' src={profile.large}></img>}

          <Button variant='contained' size='small' type='submit'>Add</Button>
          <Button onClick={randomProfileHandler}>random img</Button>
        </Stack>}

        {edit && (
          <>
          {profile ? (
            <Stack direction='row' alignItems='center' spacing={2} width='100%'>
              <img alt='teacher' style={{width: '80%'}} src={profile.large}></img> 
              <IconButton aria-label="delete" variant size='small' onClick={deleteProfileHandler}>
                <DeleteIcon fontSize='small'/>
              </IconButton>
            </Stack>
          ) : (
            <Stack direction='row' alignItems='center' spacing={2} width='100%'>
              {(teacher && teacher.profile) ? (
                <>
                  <img alt='teacher' style={{width: '50%'}}  src={teacher.profile}></img> 
                  <IconButton aria-label="delete" variant size='small' onClick={deleteProfileHandler}>
                    <DeleteIcon fontSize='small'/>
                  </IconButton>
                </>
                ) : (
                  <Avatar sx={{width: '50%', height: '50%', aspectRatio: 1 / 1}} variant='rounded'/>
                )}
              </Stack>
            )}
            <Button onClick={randomProfileHandler}>random img</Button>
            <EditButtonsGroup 
              margin
              cancelClickHandler={(() => setIsEditing(false))}
            />
          </>
        )}

        <SnackbarAlert
          close={handleClose}
          type={alertType}
          text={alertMessage}
        >
        </SnackbarAlert>
      </Box>
    )
  )
}

export default AddTeacher