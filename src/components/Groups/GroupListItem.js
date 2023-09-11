import { ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const GroupListItem = ({group}) => {
  return (
    <ListItem component={Link} to={`/groups/${group.id}`}>
        <ListItemText primary={group.title} secondary={group.students && group.students.length + (group.students.length > 1 ? 'Students' : 'Student')} />
    </ListItem>
  )
}

export default GroupListItem