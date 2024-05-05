import { Button, Stack } from '@mui/material'
import React, { useContext } from 'react'
import StudentContext from '../../store/student-context'

const StudentsButtonsGroup = () => {
  const ctx = useContext(StudentContext)

  return (
    <Stack direction='row' spacing={2} mb={5} mt={1}>
        <Button variant='contained' color='error' size='small' onClick={ctx.deleteClickHandler}>Delete</Button>

        <Button variant='contained' color='secondary' onClick={() => ctx.setIsEditing(true)} size='small'>Edit</Button>
    </Stack>
  )
}

export default StudentsButtonsGroup