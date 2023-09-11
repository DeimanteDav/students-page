import React from 'react'
import ButtonsGroup from '../Buttons/ButtonsGroup'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
import SchoolInfo from './SchoolInfo'
import { Grid } from '@mui/material'

const Style = styled.div`
  max-width: 500px;
  min-width: 300px;

  & h2 {
    margin-top: 0;
  }

  & h3 {
    font-weight: 400;
    margin-bottom: 10px;
  }
  & img {
    width: 100%;
    height: auto;
  }
`


const SchoolForm = ({setIsEditing, school}) => {
    let navigate = useNavigate()

    const deleteSchoolHandler = () => {
      axios.delete(`${config.API_URL}/schools/${school.id}`)
        .then(response => {
          if (response.statusText === 'OK') {
            return navigate('/schools')
          }
        })
    }

  return (
    <Style>
      <Grid container mt={5} mb={4} gap={2}>
          <SchoolInfo school={school} />

          <Grid xs={12}>
              <ButtonsGroup
                  deleteClickHandler={deleteSchoolHandler}
                  editClickHandler={(() => setIsEditing(true))}
              />
          </Grid>
      </Grid>
    </Style> 
  )
}

export default SchoolForm