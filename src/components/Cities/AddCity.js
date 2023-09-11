import { TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import config from '../../config'

const AddCity = ({input, setInput, setCities}) => {

     const addCityHandler = (e) => {
        e.preventDefault()
        axios.post(`${config.API_URL}/cities`, {
            name: input
        })
            .then(response => {
                if (response.status === 201) {
                    setInput('')
                    setCities(prevState => {
                        let newState = [...prevState]
                        newState.unshift(response.data)
                        return newState
                    })
                }
            })
        
    }
  return (
    <form onSubmit={addCityHandler} className='add-form'>
        <h4>Add a city</h4>
        <TextField
            id="standard-size-small"
            label="City name"
            variant="standard" 
            size='small'
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
    </form>
  )
}

export default AddCity