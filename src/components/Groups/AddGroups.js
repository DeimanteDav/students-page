import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config'
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import EditButtonsGroup from '../Buttons/EditButtonsGroup'
import useFetchData from '../../hooks/useFetchData'
import useLocalStorage from '../../hooks/useLocalStorage'

const AddGroups = ({group, setAddingGroup, setIsEditing, add = false, edit = false, groupId}) => {
    const [title, setTitle] = useLocalStorage('group-title', (group ? group.title : ''))
    const [teacher, setTeacher] = useLocalStorage('group-teacher', (group ? group.teacher.id : ''))
    const [school, setSchool] = useLocalStorage('group-school', (group ? group.school : null))

    const [userRole, setUserRole] = useState('')
    useEffect(() => {
      setUserRole(localStorage.getItem('userRole'))
    }, [])  

    let {data: teachersOptions, error: teachersOptError} = useFetchData(`${config.API_URL}/teachers`)

    let {data: schoolsOptions, error: schoolsOptError} = useFetchData(`${config.API_URL}/schools?_expand=city`)

    const addGroupHandler = (e) => {
        e.preventDefault()
        axios.post(`${config.API_URL}/groups`, {
            title,
            teacherId: teacher,
            schoolId: school ? school.id : ''
        })
            .then(res => {
                if (res.status === 201) {
                    setTitle('')
                    setTeacher(null)
                    setSchool(null)
                    setAddingGroup(prevState => !prevState)
                }
            })
    }
    


    const editGroupHandler = (e) => {
        e.preventDefault()

        fetch(`${config.API_URL}/groups/${groupId}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                teacherId: teacher,
                schoolId: school.id
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => {
                if (response.ok) {
                    setIsEditing(false)
                    localStorage.setItem('group-title', null)
                    localStorage.setItem('group-teacher', null)
                    localStorage.setItem('group-school', null)
                }
            })
    }

    
  return (
    userRole == 'administrative' && (
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root, .MuiFormControl-root': { m: 1, width: '25ch' },
            mb: 4,
            '& h3': {mb: 1, ml: 1},
            '& button': {ml: 1}
            }}
            noValidate
            autoComplete="off"
            width={'25ch'}
            onSubmit={add ? addGroupHandler : editGroupHandler}
        >
            {add && <h2>Add a group</h2>}
            <TextField
                id="outlined-required"
                label="Title"
                type="text"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size='small'
            />
            
            <FormControl sx={{ width: '100%' }} size="small">
                <InputLabel id="demo-select-small-label">Teacher</InputLabel>
                <Select
                    value={teacher}
                    label='Teacher'
                    onChange={(e) => setTeacher(e.target.value)}
                >
                
                {teachersOptions ? (
                    teachersOptions.map(teacher => {
                    return <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>
                })
                ) : (
                    <MenuItem>{teachersOptError}</MenuItem>
                )}
                </Select>
            </FormControl>
            
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

            {add ? (
                <Button variant='contained' type='submit' size='small'>Add</Button>
            ) : (
                <EditButtonsGroup margin cancelClickHandler={() => setIsEditing(false)}/>
            )}
        </Box>
    )
  )
}

export default AddGroups