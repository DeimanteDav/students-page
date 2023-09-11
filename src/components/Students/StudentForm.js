import React from 'react'
import { styled } from 'styled-components'
import StudentInfo from './StudentInfo'
import ButtonsGroup from '../Buttons/ButtonsGroup'
import StudentsButtonsGroup from '../Buttons/StudentsButtonsGroup'


const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    max-width: 600px;

    .info {
        display: flex;
        flex-direction: column;
        gap: 20px 0;

        & div {
            display: flex;
            flex-direction: column;
            gap: 5px 0;
            width: 100%;
    
            & label {
                font-weight: 500;
            }
        }
    }
`

const StudentForm = () => {
  return (
    <Form className='student'>
        <StudentInfo />
        <StudentsButtonsGroup/>
    </Form>
  )
}

export default StudentForm