import { Grid } from '@mui/material'
import React from 'react'

const SchoolInfo = ({school}) => {
  return (
    <>
        <Grid xs={12} sm={5}>
            <h2>{school.name && school.name}</h2>  
            <h3>{school.city && school.city.name}</h3>
        </Grid>
        
        <Grid xs={8} sm={5}>
            <img src={school.image ? school.image : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}></img>
        </Grid>
    </>
  )
}

export default SchoolInfo