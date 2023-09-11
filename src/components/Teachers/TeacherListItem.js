import React from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const TeacherListItem = ({teacher}) => {
  return (
    <ListItem component={Link} to={`/teachers/${teacher.id}`} key={teacher.id} >
        <ListItemAvatar>
            {teacher.profile ? (
                <Avatar src={teacher.profile}/>
            ) : (
                <Avatar></Avatar>
            )}
        </ListItemAvatar>
            <ListItemText
                primary={teacher.name + ' ' + teacher.surname}
            />
    </ListItem>
  )
}

export default TeacherListItem