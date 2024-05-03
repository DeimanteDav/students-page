import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import config from '../config.js'
import { styled } from 'styled-components'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { Autocomplete, Avatar, Button, ButtonGroup, IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '../components/Container.js'
import AddClasses from '../components/Teachers/AddClasses.js'
import ButtonsGroup from '../components/Buttons/ButtonsGroup.js'
import EditButtonsGroup from '../components/Buttons/EditButtonsGroup.js'
import TeacherForm from '../components/Teachers/TeacherForm.js'
import AddTeacher from '../components/Teachers/AddTeacher.js'




const EditingStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  align-items: flex-start;
  max-width: 300px;

  & .info {
      width: 100%;
    }

  & h2 {
    margin-bottom: 4px;
    margin-top: 10px;
  }
  & h4 {
    margin: 5px 0;
  }
  
  & .class {
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
  }

  & button:not(.MuiButtonBase-root) {
    padding: 3px 10px;
    border: 1px solid #cecece;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.12s ease-in-out;
    & button:hover {
        background-color: rgb(226, 226, 226);
    }
  }
`



const Teacher = () => {
  let {teacherId} = useParams()
  const [teacher, setTeacher] = useState({})

  const [allClasses, setAllClasses] = useState([])
  const [profile, setProfile] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [classDeleting, setClassDeleting] = useState(false)
  const [addingClass, setAddingClass] = useState(false)


  const [school, setSchool] = useState(null)
  const [schoolsOptions, setSchoolsOptions] = useState([])

  
  useEffect(() => {
    axios.get(`${config.API_URL}/teachers/${teacherId}?_embed=classes&_expand=school`)
    .then(res => setTeacher(res.data))
  }, [teacherId, classDeleting, addingClass, isEditing])
  

  useEffect(() => {
     axios.get(`${config.API_URL}/schools?_expand=city`)
       .then(res => setSchoolsOptions(res.data))
   }, [])
  
  useEffect(() => {
    axios.get(`${config.API_URL}/classes`)
    .then(res => {
      if (res.status === 200) {
          let filteredClasses = res.data.filter(oneClass => {
            return oneClass.teacherId !== Number(teacherId)
        })
        setAllClasses(filteredClasses)
      }
    })
  }, [teacherId, addingClass, classDeleting])

  const randomProfileHandler = (e) => {
    e.preventDefault()
    axios.get('https://randomuser.me/api/')
      .then(response => {
        setProfile(response.data.results[0].picture);
      })
  }

  const deleteProfileHandler = () => {
    axios.patch(`${config.API_URL}/teachers/${teacherId}`, {
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

  function deleteClassHandler(id, e) {
    e.preventDefault()
    axios.patch(`${config.API_URL}/classes/${id}`, {
      teacherId: ""
    })
      .then(res => {
        if (res.status === 200) {
            setClassDeleting(prevState => !prevState)
        }
      })
  }


  // const editTeacherHandler = (e) => {
  //   e.preventDefault()

  //   axios.put(`${config.API_URL}/teachers/${teacherId}`, {
  //     name: teacher.name,
  //     surname: teacher.surname,
  //     date: teacher.date,
  //     profile: profile ? profile.large : teacher.profile,
  //     schoolId: school ? school.id : '',
  //     id: Number(teacherId),
  //   })
  //     .then(response => {
  //       if (response.status === 200) {
  //         setIsEditing(false)
  //         if (profile) {
  //           setTeacher(prevState => {
  //             let newState = {...prevState}
  //             return {...newState, profile: profile.large}
  //           })
  //           setProfile('')
  //         }
  //       }
  //     })

  // }
  

  return (
    <Container>
      {isEditing ? (
        <>
        {/* <EditingStyle onSubmit={editTeacherHandler}>
          <h2>Teacher info</h2>
          
          {profile ? 
          <Stack direction='row' alignItems='center' spacing={2} width='100%'>
            <img style={{width: '50%'}} src={profile.large}></img> 
            <IconButton aria-label="delete" variant size='small' onClick={deleteProfileHandler}>
              <DeleteIcon fontSize='small'/>
            </IconButton>
          </Stack>
          
          :
          <Stack direction='row' alignItems='center' spacing={2} width='100%'>
          {teacher.profile ?
            <>
              <img style={{width: '50%'}}  src={teacher.profile}></img> 
              <IconButton aria-label="delete" variant size='small' onClick={deleteProfileHandler}>
                <DeleteIcon fontSize='small'/>
              </IconButton>
            </>
          : <Avatar sx={{width: '50%', height: '50%', aspectRatio: 1 / 1}} variant='rounded'/>}
          </Stack>}
          <Button onClick={randomProfileHandler}>random img</Button>

          <TextField
            label='First Name'
            size='small'
            className='info'
            value={teacher.name}
            onChange={(e) => setTeacher(prevState => ({...prevState, name: e.target.value}))}
          />

          <TextField
            label='Last Name'
            size='small'
            className='info'
            value={teacher.surname}
            onChange={(e) => setTeacher(prevState => ({...prevState, surname: e.target.value}))}
          />

          <TextField
            size='small'
            type='date'
            className='info'
            value={teacher.date}
            onChange={(e) => setTeacher(prevState => ({...prevState, date: e.target.value}))}
          />

          <Autocomplete
            size='small'
            options={schoolsOptions.sort((a, b) => -b.city.name.localeCompare(a.city.name))}
            groupBy={(option) => option.city.name}
            value={school}
            onChange={(event, value) => setSchool(value)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="School" variant="outlined" />}
          />
          
          <EditButtonsGroup
            margin
            cancelClickHandler={(() => setIsEditing(false))}
          />
        </EditingStyle>  */}
        <AddTeacher
          edit
          setTeacher={setTeacher}
          teacher={teacher}
          setIsEditing={setIsEditing}
        />
        </>
      ) : (
        <TeacherForm
          teacher={teacher}
          setIsEditing={setIsEditing}
          allClasses={allClasses}
          teacherId={teacherId}
          setTeacher={setTeacher}
          deleteClassHandler={deleteClassHandler}
          setAddingClass={setAddingClass}
        />
      )}
    </Container>

  )
}

export default Teacher