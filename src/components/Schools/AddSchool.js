import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config'
import DeleteIcon from '@mui/icons-material/Delete';
import EditButtonsGroup from '../Buttons/EditButtonsGroup';
import useFetchData from '../../hooks/useFetchData';
import useLocalStorage from '../../hooks/useLocalStorage';

const AddSchool = ({ school, setIsEditing, setIsAddingSchool, edit = false, add = false, schoolId}) => {
    const [name, setName] = useLocalStorage('school-name', (school ? school.name : ''))
    const [city, setCity] = useLocalStorage('school-city', (school ? school.city.id : ''))
    const [image, setImage] = useLocalStorage('school-image', (school ? school.image : ''))
    const [isImgDeleted, setIsImgDeleted] = useState(null)

    // const [citiesOpt, setCitiesOpt] = useState([])

    
    const [userRole, setUserRole] = useState('')
    useEffect(() => {
      setUserRole(localStorage.getItem('userRole'))
    }, [])

    
    let {data: citiesOpt, error: citiesOptError} = useFetchData(`${config.API_URL}/cities`)


    function addSchoolHandler(e) {
        e.preventDefault()
    
        axios.post(`${config.API_URL}/schools`, {
            name,
            cityId: Number(city)
        })
            .then(res => {
                if (res.status === 201) {
                    setName('')
                    setCity('')
                    setIsAddingSchool(prevState => !prevState)
                }
            })
    }
    
    const editSchoolHandler = () => {
        axios.patch(`${config.API_URL}/schools/${schoolId}`, {
          name,
          cityId: city,
          image
        })
          .then(res => {
            if(res.statusText === 'OK') {
              setIsEditing(false)
              setName('')
              setCity('')
              setImage('')
              setIsImgDeleted(null)
              localStorage.setItem('school-name', null)
              localStorage.setItem('school-city', null)
              localStorage.setItem('school-image', null)
            }
          })
      }

  return (
    userRole == 'administrative' && (
        <Box component='form' onSubmit={edit ? editSchoolHandler : addSchoolHandler} sx={{ maxWidth: '600px', '& h3': {mb: 0}}}>
        <Grid container mb={4} gap={2}>
        {add && <Grid xs={12}> <h3>Add a school</h3> </Grid>}
            <Grid xs={12} sm={5}>
                <Stack direction='column' spacing={2} maxWidth='250px' minWidth='150px'>
                    <TextField label='School title' size='small' value={name} onChange={(e) => setName(e.target.value)}></TextField>

                    <FormControl size='small'>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size='small'
                        value={city}
                        label="Age"
                        onChange={(e) => setCity(e.target.value)}
                    >
                        {citiesOpt ? (
                            citiesOpt.map(city => (
                                <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                            ))
                        ) : (
                            <MenuItem>{citiesOptError}</MenuItem>
                        )}
                    </Select>
                    </FormControl>
                    
                    <Stack direction='row' spacing={1}>
                        <TextField
                            label='Image link'
                            size='small'
                            value={image === 'deleted' ? '' : image}
                            onChange={(e) => setImage(e.target.value)}
                            sx={{width: '100%'}}
                        />
                        {edit && (
                            <IconButton size='small' onClick={() => setIsImgDeleted(true)}>
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                        )}
                    </Stack>
                </Stack>

            </Grid>

            {edit ? (
                <>
                <Grid xs={8} sm={5}>
                {isImgDeleted ? (
                    <img src={'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}></img>
                ) : (
                    <img src={school.image ? school.image : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}></img>
                )}
                </Grid>
                
                <Grid xs={12} sm={5} alignSelf='center'>
                    <EditButtonsGroup
                        cancelClickHandler={(() => {
                        setIsEditing(false)
                        setIsImgDeleted(null)
                        })}
                    />
                </Grid>
                </>
            ) : (
                <Grid xs={12} alignSelf='center'>
                    <Button variant='contained' type='submit' size='small'>ADd</Button>
                </Grid>
            )}
        </Grid>
        </Box>
    )
  )
}

export default AddSchool