import { Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ButtonsGroup = ({deleteClickHandler, editClickHandler, className = false, margin = false}) => {
  const [userRole, setUserRole] = useState('')
  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'))
  })

  return (
    userRole == "administrative" && (
      <Stack className={className && className} direction='row' spacing={2} mb={margin && 5} mt={margin && 1}>
          <Button variant='contained' color='error' size='small' onClick={deleteClickHandler}>Delete</Button>
          <Button variant='contained' color='secondary' onClick={editClickHandler} size='small'>Edit</Button>
      </Stack>
    )
  )
}

export default ButtonsGroup