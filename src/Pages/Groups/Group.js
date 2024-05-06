import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import Container from '../../components/General/Container'
import AddGroups from '../../components/Groups/AddGroups'
import config from '../../config'
import StudentsList from '../../components/Students/StudentsList'
import GroupForm from '../../components/Groups/GroupForm'
import useFetchData from '../../hooks/useFetchData'
import LoadingBar from '../../components/General/LoadingBar'


const Group = () => {
    let {groupId} = useParams()

    const [students, setStudents] = useState([])

    const [selectedStudent, setSelectedStudent] = useState('')
    const [addingStudent, setAddingStudent] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const [userRole, setUserRole] = useState('')

    useEffect(() => {
      setUserRole(localStorage.getItem('userRole'))
    }, [])


    let {data: group, error: groupError, loading} = useFetchData(`${config.API_URL}/groups/${groupId}?_embed=students&_expand=teacher&_expand=school`, 'get', [groupId, addingStudent, isEditing])


    useEffect(() => {
        axios.get(`${config.API_URL}/students`)
            .then(res => {
                let filteredStudents = res.data.filter(student => {
                    return student.groupId !== Number(groupId)
                })
                setStudents(filteredStudents)
            })
    }, [groupId, addingStudent])

    
    const addStudentHandler = (e) => {
        e.preventDefault()
        axios.patch(`${config.API_URL}/students/${selectedStudent}`, {
           groupId: Number(groupId)
        }) 
            .then(res => {
                if (res.status === 200) {
                    setSelectedStudent('')
                    setAddingStudent(prevState => !prevState)
                    setStudents(prevState => {
                        let newState = [...prevState].filter(student => {
                           return student.id !== selectedStudent
                        })
                        return newState
                    })
                }
            })        
    }


    let redirect = useNavigate()

    const deleteGroupHandler = () => {
      axios.delete(`${config.API_URL}/groups/${groupId}`)
        .then(response => {
          if (response.statusText === 'OK') {
            return redirect('/groups')
          }
        })
    }

    
    if (loading) {
      return <LoadingBar />
    }

  return (
    <Container>
        <div>
            {!isEditing ? (
                <GroupForm group={group} deleteGroupHandler={deleteGroupHandler} setIsEditing={setIsEditing} />
            ) : (
                <AddGroups group={group} edit setIsEditing={setIsEditing} groupId={groupId} />
            )}

            <StudentsList students={group.students} header />

            {userRole === 'administrative' && (
                <Box 
                    component="form"
                    sx={{ maxWidth: '24ch' }}
                    noValidate
                    autoComplete="off"
                    onSubmit={addStudentHandler}
                >
                    <Stack direction='column' flexWrap='wrap' spacing={1}>
                    <h4>Add students to the group</h4>
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">Select a student</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={selectedStudent}
                                label="Select a student"
                                onChange={(e) => setSelectedStudent(e.target.value)}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {students.map(student => {
                                return <MenuItem value={student.id} key={student.id}>{student.name} {student.surname}</MenuItem>
                            })}
                            </Select>
                        </FormControl>
                        <Button variant="contained" size='small' type='submit'>ADD</Button>
                    </Stack>
                </Box>
            )} 
        </div>
    </Container>
  )
}

export default Group

