import React from 'react'
import { styled } from 'styled-components'
import ButtonsGroup from '../Buttons/ButtonsGroup'
import AddClasses from './AddClasses'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
import TeacherInfo from './TeacherInfo'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px 0;
  align-items: flex-start;
  width: 300px;

  & .info {
    display: flex;
    flex-direction: column;
    gap: 15px 0;

    & .list {
        display: flex;
        flex-direction: column;
        gap: 5px 0;
        width: 100%;

        & label {
        font-weight: 500;
        }
    }
  }

  & h2 {
    margin-bottom: 4px;
    margin-top: 10px;
  }

  & img {
    border-radius: 3px;
  }



  & ul {
    margin: 0;
  }

  & h4 {
    margin: 0;
  }
`

const TeacherForm = ({teacher, setIsEditing, allClasses, teacherId, setTeacher, deleteClassHandler}) => {
    let redirect = useNavigate()

    const deleteTeacherHandler = () => {
      axios.delete(`${config.API_URL}/teachers/${teacherId}`)
      .then(response => {
        if (response.statusText === 'OK') {
          redirect('/teachers')
        }
      })
    }
      
  return (
    <Style>
        <TeacherInfo teacher={teacher} deleteClassHandler={deleteClassHandler} />
        <AddClasses allClasses={allClasses} teacherId={teacherId} setTeacher={setTeacher} />

        <ButtonsGroup
            margin
            deleteClickHandler={deleteTeacherHandler}
            editClickHandler={(() => setIsEditing(true))}
        />
    </Style>
  )
}

export default TeacherForm