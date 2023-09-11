import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config'
import { Typography } from '@mui/material'
import AddCity from './AddCity';
import CitiesList from './CitiesList';
import useFetchData from '../../hooks/useFetchData';

const CityForm = ({setCityIsLoading}) => {
    const [input, setInput] = useState('')

    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)


    let {data: cities, setData: setCities, loading} = useFetchData(`${config.API_URL}/cities?_sort=id&_order=desc`, {}, 'get', [isDeleting])
    setCityIsLoading(loading)


  return (
    <div>
        <Typography fontWeight='bold' variant='h6' component='h2'>Cities</Typography>
        <AddCity input={input} setInput={setInput} setCities={setCities}/>
        <CitiesList
          cities={cities}
          setCities={setCities}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsDeleting={setIsDeleting}
        />
    </div>
  )
}

export default CityForm