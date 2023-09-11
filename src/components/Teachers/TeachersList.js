import React from 'react'
import Typography from '@mui/material/Typography';
import { List, ListSubheader } from '@mui/material';
import TeachersListItem from './TeacherListItem';

const TeachersList = ({teachers, title, header = false}) => {

  return (
    <>
      {(header || title) && <Typography variant={title ? 'h5' : 'h6'} component="h2" mb={2}>{title ? title : 'Teachers'}</Typography>}
      <List>
        {(teachers && teachers.length > 0) ? (
          teachers && teachers.map(teacher => {
            return (
              <TeachersListItem teacher={teacher} />
            )
          })
        ) : (
          <Typography variant='body2' color='gray'>No teachers are assigned</Typography>
        )}
      </List>
    </>
  )
}

export default TeachersList