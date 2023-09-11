import { Button, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import config from '../../config'
import StudentContext from '../../store/student-context'

const AddGrades = ({classes, setStudent}) => {
    const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [gradeInput, setGradeInput] = useState('')
    const ctx = useContext(StudentContext)
    const addGradesHandler = (e) => {
        e.preventDefault()

        for (const [id, value] of Object.entries(gradeInput)) {
            axios.post(`${config.API_URL}/grades`, {
                studentId: Number(ctx.student.id),
                classId: id,
                date: new Date(),
                value: Number(value),
                updatedDate: null
            })
                .then(response => {
                    if (response.status === 201) {
                        // setAddingGrade(prevState => !prevState)
                        setGradeInput('')
                        setStudent(prevState => {
                            return {...prevState, grades: [...prevState.grades, response.data]}
                        })
                    }
                })
        }
    }

  return (
    <form className='select' style={{width: '100%'}}>
        <h3>Add grades</h3>
        <TableContainer component={Paper} className='select'>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align='right'>Grades</TableCell>
                </TableRow>
            </TableHead>
            <TableBody >
                {classes.map(oneClass => (
                    <TableRow
                        key={oneClass.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {oneClass.name}
                        </TableCell>

                        <TableCell align='right'>
                            <FormControl size='small' className='select'>
                                <Select
                                    value={gradeInput[oneClass.id] ? gradeInput[oneClass.id] : ''}
                                    onChange={(e) => setGradeInput(prevState => {
                                        let newState = {...prevState}
                                        let className = oneClass.id
                                        return {...newState, [className]: e.target.value}
                                    })}
                                    className='select'
                                >
                                    {grades.map(grade => (
                                        <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <Button onClick={addGradesHandler} type='submit' variant='contained' size='small' sx={{mt: 1}}>save</Button>
    </form>
  )
}

export default AddGrades