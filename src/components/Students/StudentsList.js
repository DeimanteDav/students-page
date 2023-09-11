import { List, Typography } from '@mui/material'
import React from 'react'
import StudentListItem from './StudentListItem'

const StudentsList = ({students, title, header = false}) => {
  return (
    <>
      {(header || title) && <Typography variant={title ? 'h5' : 'h6'} component="h2" mb={2}>{title ? title : 'Students'}</Typography>}
      <List>
        {(students && students.length > 0) ? (
          students.map(student => (
            <StudentListItem key={student.id} student={student} />
          ))
        ) : (
          <Typography variant='body2' color='gray'>No students are assigned</Typography>
        )}
      </List>
    </>
  )
}

export default StudentsList