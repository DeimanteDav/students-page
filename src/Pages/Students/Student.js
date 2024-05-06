import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Students.css'
import config from '../../config'
import Grades from '../../components/Grades/Grades'
import { styled } from 'styled-components'
import Container from '../../components/General/Container'
import StudentForm from '../../components/Students/StudentForm'
import AddStudent from '../../components/Students/AddStudent'
import StudentContext from '../../store/student-context'
import LoadingBar from '../../components/General/LoadingBar'
import useFetchData from '../../hooks/useFetchData'


const EditingForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px 0;
    align-items: flex-start;
    max-width: 300px;

    & div {
        width: 100%;
    }

    & .grades-div {
        display: flex;
        flex-direction: column;
        gap: 20px;

        & ul {
            margin: 10px;
            padding-left: 5px;
            div {
                display: flex;
                gap: 10px;
                margin-bottom: 5px;
            }
        }        
    }
`

const Student = ({ loggedInStudentId, permissions }) => {
    let {studentId} = useParams()
    const [isEditing, setIsEditing] = useState(false)

    const [gradeDeleting, setGradeDeleting] = useState(false)
    // const [addingGrade, setAddingGrade] = useState(false)


    const redirect = useNavigate()

    const {data: student, setData: setStudent, loading: studentLoading} = useFetchData(`${config.API_URL}/students/${studentId}?_expand=city&_expand=group&_embed=grades&_expand=school`, 'get', [studentId, loggedInStudentId, gradeDeleting, isEditing])

    const {data: classes, loading: classesLoading} = useFetchData(`${config.API_URL}/classes`)


    const deleteStudentHandler = () => {
        axios.delete(`${config.API_URL}/students/${studentId}`)
            .then(response => {
                if (response.statusText === 'OK') {
                    return redirect('/')
                }
            })
    }


    const deleteGradeHandler = (id, e) => {
        e.preventDefault()
        fetch(`${config.API_URL}/grades/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    setGradeDeleting(prevState => !prevState)
                }
            })
    }

    if (studentLoading || classesLoading) {
        return <LoadingBar />
    }

  return (
    <Container>
        <StudentContext.Provider value={{ student }}>
            {isEditing ? (
                <AddStudent
                    edit 
                    studentId={studentId}
                    setIsEditing={setIsEditing}
                    student={student}
                />
            ) : (
                <StudentForm onDelete={deleteStudentHandler} onEdit={() => setIsEditing(true)} student={student} />
            )}

            <Grades permissions={permissions} classes={classes} setStudent={setStudent} loggedInStudentId={loggedInStudentId} studentId={studentId} />
        </StudentContext.Provider>
    </Container>
  )
}

export default Student
