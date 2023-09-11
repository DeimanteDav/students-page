import { List } from '@mui/material'
import React from 'react'
import axios from 'axios';
import config from '../../config';
import CityItem from './CityItem';


const CitiesList = ({cities, setCities, isEditing, setIsEditing, setIsDeleting}) => {

    const editCityHandler = (id, i, e) => {
        e.preventDefault()
        fetch(`${config.API_URL}/cities/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: cities[i].name
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => {
                if (response.ok) {
                    setIsEditing(false)
                }
            })
    }

    const deleteCityHandler = (id) => {
        axios.delete(`${config.API_URL}/cities/${id}`)
        setIsDeleting(prevState => !prevState)
    }

  return (
    <>
        <List>
            <CityItem
                cities={cities}
                setCities={setCities}
                editCityHandler={editCityHandler}
                deleteCityHandler={deleteCityHandler}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
        </List>
    </>
  )
}

export default CitiesList