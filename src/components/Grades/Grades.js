import React from 'react'
import AddGrades from './AddGrades'
import GradesList from './GradesList'

const Grades = ({permissions, classes, loggedInStudentId, studentId, setStudent}) => {
    if (!permissions) {
        return ''
    } 

    return (
    <>
        {(permissions.view || (permissions.viewOwn && loggedInStudentId === studentId)) && (
            <div>
                <h3>Grades</h3>
                <GradesList
                    classes={classes} 
                /> 
            </div>
        )}

        {permissions.add && (
            <AddGrades
                classes={classes}
                setStudent={setStudent}
            />
        )}
    </>
  )
}

export default Grades