import { List, Typography } from '@mui/material'
import React from 'react'
import GroupListItem from './GroupListItem'

const GroupsList = ({groups, header = false, title, className}) => {
  return (
    <>
      {(header || title) && <Typography variant={title ? 'h5' : 'h6'} component="h2" mb={1}>{title ? title : 'Groups'}</Typography>}
      <List className={className && className}>
        {(groups && groups.length > 0) ? (
          groups.map(group => (
             <GroupListItem key={group.id} group={group} />
         ))
        ) : (
          <Typography variant='body2' color='gray'>No groups are assigned</Typography>
        )}
      </List>
    </>
  )
}

export default GroupsList