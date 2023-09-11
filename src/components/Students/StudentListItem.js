import React from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

const StudentListItem = ({student}) => {
  return (
    <ListItem className={student.code && 'inactive'} component={Link} to={`/students/${student.id}`} key={student.id} >
        <ListItemAvatar>
            <Avatar></Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={student.name + ' ' + student.surname}
        />
    </ListItem>
  )
}

export default StudentListItem