import React from 'react'
import GroupInfo from './GroupInfo'
import ButtonsGroup from '../Buttons/ButtonsGroup'
import styles from '../../Pages/Groups/Groups.module.scss'

const GroupForm = ({group, deleteGroupHandler, setIsEditing}) => {
  return (
    <div className={styles.group}>
        <GroupInfo group={group} />

        <ButtonsGroup
            className={styles.buttons}
            deleteClickHandler={deleteGroupHandler} 
            editClickHandler={() => setIsEditing(true)}
        />
    </div>


  )
}

export default GroupForm