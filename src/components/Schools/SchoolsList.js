import { Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const SchoolsList = ({cities, cityName, divider = false}) => {
  return (
    <> 
      <Typography variant={cityName ? 'h5' : 'h6'} component="h2" mb={2}>{cityName ? cityName : 'Schools'}</Typography>
          {cities && cities.map(city => (
        <List
          key={city.id}
          subheader={ divider && 
            <ListSubheader component={Link} to={`/cities/${city.id}`}>
              {city.name}
            </ListSubheader>
          }
        >
          <>
            {city.schools.map(school => (
              <ListItem>
                <ListItemButton
                  key={school.id}
                  component={Link}
                  to={`/schools/${school.id}`}
                  sx={{ paddingY: 0 }}
                >
                  <ListItemText primary={school.name}></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            {divider && <Divider></Divider>}
          </>
        </List>
          ))}
    </>
  )
}

export default SchoolsList