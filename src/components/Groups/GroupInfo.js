import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../Pages/Groups/Groups.module.scss'

const GroupInfo = ({group}) => {
  return (
    <div className={styles.info}>
        <h2>{group.title}</h2>

        <div>
            <label htmlFor='teacher'>Teacher</label>
            {group.teacher ? (
                <Link id='teacher' to={`/teachers/${group.teacher.id}`}>{group.teacher.name} {group.teacher.surname}</Link>
            ) : (
                <Typography id='teacher' variant='body1' color='gray'>No teacher</Typography>
            )}
        </div>

        <div>
            <label htmlFor='school'>School</label>
            {group.school ? (
                <Link id='school' to={`/schools/${group.school.id}`}>{group.school.name}</Link>
            ) : (
                <Typography id='school' variant='body1' color='gray'>No school</Typography>
            )}
        </div>
    </div>
  )
}

export default GroupInfo