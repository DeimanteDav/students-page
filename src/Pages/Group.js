import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Groups.css'

const Group = () => {
    // studentu informacija
    // paspausti ant studento
    let {groupId} = useParams()
    const [group, setGroup] = useState({})

    const [students, setStudents] = useState([])

    const [selectedStudent, setSelectedStudent] = useState('default')
    const [addingStudent, setAddingStudent] = useState(false)


    useEffect(() => {
        axios.get(`http://localhost:3000/groups/${groupId}?_embed=students`)
            .then(res => setGroup(res.data))
    }, [groupId, addingStudent])


    useEffect(() => {
        axios.get(`http://localhost:3000/students`)
            .then(res => {
                console.log(res);
                let filteredStudents = res.data.filter(student => {
                    return student.groupId !== Number(groupId)
                })
                setStudents(filteredStudents)
            })
    }, [groupId, addingStudent])

    const addStudentHandler = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:3000/students/${selectedStudent}`, {
           groupId: Number(groupId)
        }) 
            .then(res => {
                if (res.status === 200) {
                    setSelectedStudent('default')
                    setAddingStudent(prevState => !prevState)
                    setStudents(prevState => {
                        let newState = [...prevState].filter(student => {
                           return student.id !== selectedStudent
                        })
                        
                        console.log(newState);
                        return newState
                    })
                }
            })

        
    }


  return (
    <div className='groups'>
        <h3>{group.title}</h3>
        <h4>Students</h4>
        <ul>
            {group.students && group.students.length > 0 ? group.students.map(student => {
                return (
                    <li key={student.id}>
                        <Link to={`/students/${student.id}`}>{student.name} {student.surname}</Link>
                    </li>
                )
            }) : 
            <span>There are no students in this group</span>}</ul>

        <form onSubmit={addStudentHandler}>
            <h4>Add students to the group</h4>
          
            <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
            >
                <option value='default' disabled>Select a student</option>
                {students.map(student => {
                    return <option value={student.id} key={student.id}>{student.name} {student.surname}</option> 
               })}
            </select>

            <button type='submit'>ADD</button>
        </form>
    </div>
  )
}

export default Group

// JEIGU LIKS LAIKO

// add student prie grupes
// ismestu tik tuos studentus kuriu nera grupeje
// patch metodas, nes tik viena