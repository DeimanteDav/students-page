import React, { useState } from 'react'
import styles from './Groups.module.scss'
import Container from '../../components/General/Container'
import GroupsList from '../../components/Groups/GroupsList'
import AddGroups from '../../components/Groups/AddGroups'
import useFetchData from '../../hooks/useFetchData'
import config from '../../config'
import LoadingBar from '../../components/General/LoadingBar'

const Groups = () => {
    const [addingGroup, setAddingGroup] = useState(false)

    let {data: groups, error: groupsError, loading} = useFetchData(`${config.API_URL}/groups?_embed=students&_sort=id&_order=desc`, 'get', [addingGroup])

    if (loading) {
      return <LoadingBar />
    }
  
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