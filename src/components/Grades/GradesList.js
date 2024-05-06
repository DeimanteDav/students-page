import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import GradesListItem from './GradesListItem'
import StudentContext from '../../store/student-context'

const GradesList = ({ classes }) => {
    let [rows, setRows] = useState([])
    const ctx = useContext(StudentContext)

    useEffect(() => {
        let studentGrades = classes.map(oneClass => {
            let classGrades = ctx.student.grades && ctx.student.grades.filter(grade => +grade.classId === +oneClass.id)

            return {oneClass, classGrades}
        })
        setRows(studentGrades)
    }, [ctx.student, classes])

    let gradesCount = useRef(0)

    function maxGradesCount() {
        if (rows.classGrades) {
            rows.forEach((row) => {
                if (gradesCount.current < row.classGrades.length) {
                    gradesCount.current = row.classGrades.length
                }
            })
        }
    }
    maxGradesCount()
    rows.forEach(row => console.log(row))

    return (
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                    <TableCell colSpan={gradesCount.current} sx={{ fontWeight: 600 }} align='right'>Grades</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => (
                    <GradesListItem key={row.oneClass.id} row={row} />
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default GradesList