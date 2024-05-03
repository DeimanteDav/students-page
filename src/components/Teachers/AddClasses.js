import { Autocomplete, Box, Button, FormControl, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config'

const AddClasses = ({allClasses, teacherId, setAddingClass, setTeacher}) => {
    const [selectedClass, setSelectedClass] = useState(null)

    const [userRole, setUserRole] = useState('')
    useEffect(() => {
      setUserRole(localStorage.getItem('userRole'))
    }, [])

    const addClassHandler = (e) => {
        e.preventDefault()
        
        axios.patch(`${config.API_URL}/classes/${selectedClass.id}`, {
        teacherId: Number(teacherId)
        })
        .then(response => {
            if (response.status === 200) {
                setSelectedClass(null)
                setAddingClass(prevState => !prevState)
                setTeacher(prevState => {
                    return {...prevState, classes: [...prevState.classes, response.data]}
                })
            }
        })
    }

    const checkKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    }

  return (
    userRole === 'administrative' && (
        <Box
            component='form'
            onSubmit={addClassHandler}
            onKeyDown={(e) => checkKeyDown(e)}
            sx={{ marginBottom: '15px', marginTop: '10px' }}
        >
            <h4 style={{ marginBottom: '15px' }}>Add Classes</h4>
            <Stack direction='row' spacing={1} alignItems='center'>
                <FormControl sx={{ minWidth: 120 }} size="small">
                <Autocomplete
                    size='small'
                    autoHighlight
                    options={allClasses.map(oneClass => ({label: oneClass.name, id: oneClass.id}))}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    sx={{ width: 170 }}
                    value={selectedClass}
                    onChange={(event, value) => setSelectedClass(value)}
                    renderInput={(params) => <TextField {...params} label="Classes"
                        inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                        }}
                    />}
                />
                </FormControl>
                <Button variant="contained" size='small' type='submit'>ADD</Button>
            </Stack>

        </Box>
    )
  )
}

export default AddClasses