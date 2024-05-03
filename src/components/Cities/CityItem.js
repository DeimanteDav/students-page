import { Button, ButtonGroup, ListItem, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const CityItem = ({cities, setCities, editCityHandler, deleteCityHandler, isEditing, setIsEditing}) => {
  return (
    cities && cities.map((city, i) => (
        <ListItem key={i}>
            {isEditing === city.id ? (
                <form onSubmit={(e) => editCityHandler(city.id, i, e)}>
                    <TextField
                        size='small'
                        value={cities[i].name}
                        onChange={(e) => setCities(prevState => {
                            let newState = [...prevState]
                            newState[i] = {
                                ...newState[i],
                                name: e.target.value
                            }
                            return newState
                        })}
                    />
                    <ButtonGroup variant="outlined" aria-label="small outlined button group" size='small'>
                        <Button variant='text' type='submit' onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button variant='text' color='success' type='submit'>Save</Button>
                    </ButtonGroup>
                </form>
            ) : (
                <>
                    <Typography variant='body'>{city.name}</Typography>
                    <Stack direction='row' spacing={1}>
                        <IconButton aria-label="delete" size='small' onClick={() => deleteCityHandler(city.id)}>
                            <DeleteIcon fontSize='small'/>
                        </IconButton>
                        <Button variant="outlined" size="small" onClick={() => setIsEditing(city.id)}>EDIT</Button>
                    </Stack>
                </>
            )}
        </ListItem>
    ))
  )
}

export default CityItem