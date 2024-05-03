import React, { useState } from 'react'
import styles from './Groups.module.scss'
import Container from '../components/Container'
import GroupsList from '../components/Groups/GroupsList'
import AddGroups from '../components/Groups/AddGroups'
import useFetchData from '../hooks/useFetchData'
import config from '../config'


const Groups = () => {
    const [addingGroup, setAddingGroup] = useState(false)

    let {data: groups, error: groupsError} = useFetchData(`${config.API_URL}/groups?_embed=students&_sort=id&_order=desc`, 'get', [addingGroup])

    
  return (
    <Container>
      <AddGroups add setAddingGroup={setAddingGroup} />
      {groups ? (
        <GroupsList className={styles.groups} groups={groups} header/>
      ) : (
        <span>{groupsError}</span>
      )}
    </Container>
  )
}



export default Groups