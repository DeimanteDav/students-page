import React, { useEffect, useState } from 'react'
import { useParams, redirect } from 'react-router-dom'
import axios from 'axios'
import './Students.css'
import config from '../config'
import Grades from '../components/Grades'

const Student = () => {
    let {studentId} = useParams()
    const [student, setStudent] = useState({})

    const [classes, setClasses] = useState([])

    const [isEditing, setIsEditing] = useState(false)


    const [citiesOption, setCitiesOption] = useState([])
    const [groupsOption, setGroupsOption] = useState([])

    const [gradeInput, setGradeInput] = useState({})
    const [gradeDeleting, setGradeDeleting] = useState(false)
    const [addingGrade, setAddingGrade] = useState(false)

    useEffect(() => {
        axios.get(`${config.API_URL}/students/${studentId}?_expand=city&_expand=group&_embed=grades`)
        .then(response => setStudent(response.data))
    }, [studentId, gradeDeleting, isEditing])


    useEffect(() => {
      axios.get(`${config.API_URL}/cities`)
        .then(response => setCitiesOption(response.data))
    }, [])
  
    useEffect(() => {
      axios.get(`${config.API_URL}/groups`)
        .then(response => setGroupsOption(response.data))
    }, [])


    useEffect(() => {
        axios.get(`${config.API_URL}/classes`)
            .then(res => setClasses(res.data))
    }, [])


    const editStudentHandler = (e) => {
        e.preventDefault()
        
        console.log(student.grades);
        axios.put(`${config.API_URL}/students/${studentId}`, {
            name: student.name,
            surname: student.surname,
            cityId: student.cityId,
            groupId: student.groupId,
            id: Number(studentId),
        })
            .then(response => {
                if (response.status === 200) {
                    setIsEditing(false)
                }
            })

        student.grades.forEach(grade => {
            axios.patch(`${config.API_URL}/grades/${grade.id}`, {
                updatedDate: new Date(),
            })
                .then(res => {
                    console.log(res);
                    if (res.ok) {
                        setIsEditing(false)
                    }
                })
        })
    }

    const deleteStudentHandler = () => {
        axios.delete(`${config.API_URL}/students/${studentId}`)
            .then(response => {
                if (response.statusText === 'OK') {
                    return redirect('/')
                }
            })
    }

    const addGradeHandler = (id, e) => {
        e.preventDefault()

        axios.post(`${config.API_URL}/grades`, {
            studentId: Number(studentId),
            classId: id,
            date: new Date(),
            value: Number(gradeInput.value),
            updatedDate: null
        })
            .then(response => {
                if (response.status === 201) {
                    setAddingGrade(prevState => !prevState)
                    setGradeInput({})
                    setStudent(prevState => {
                        return {...prevState, grades: [...prevState.grades, response.data]}
                    })
                }
            })
    }

    const deleteGradeHandler = (id, e) => {
        e.preventDefault()
        console.log(id);
        fetch(`${config.API_URL}/grades/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    setGradeDeleting(prevState => !prevState)
                }
            })
    }


  return (
    <>
    <h2>Student info</h2>
    {isEditing ?

    <form className='student editing' onSubmit={editStudentHandler}>
        <div>
            <label htmlFor='name'>First name</label>
            <input
                id='name'
                value={student.name}
                onChange={(e) => setStudent(prevState => ({...prevState, name: e.target.value}))}
            />
        </div>

        <div>
            <label htmlFor='surname'>Last name</label>
            <input
                id='surname'
                value={student.surname}
                onChange={(e) => setStudent(prevState => ({...prevState, surname: e.target.value}))}
            />
        </div>

        <div>
            <label htmlFor='city'>City</label>
            <select
                value={student.cityId}
                id='city'
                onChange={(e) => setStudent(prevState => {
                   return {...prevState, cityId: Number(e.target.value)}
            })}>
                    {citiesOption.map(city => <option value={city.id} key={city.id}>{city.name}</option>)}
            </select>
        </div>

        <div>
            <label htmlFor='group'>Group</label>
            <select
                value={student.groupId} 
                id='group'
                onChange={(e) => setStudent(prevState => {
                    return {...prevState, groupId: Number(e.target.value)}
            })}>
                {groupsOption.map(group => <option value={group.id} key={group.id}>{group.title}</option>)}
            </select>
        </div>

        <div className='grades'>
            <Grades
                classes={classes} 
                student={student}
                gradeInput={gradeInput}
                setGradeInput={setGradeInput}
                onAddGrade={addGradeHandler}
                addingGrade={addingGrade}
                isEditing={isEditing}
                setStudent={setStudent}
                onDelete={deleteGradeHandler}
           />
        </div>

        <button type='submit'>EDIT</button>
    </form> :

    <div className='student'>
        <div>
            <label htmlFor='name'>First name</label>
            <span id='name'>
                {student.name ?
                <span >{student.name}</span> :
                <span className='error'>{'name not given'}</span>}
            </span>
        </div>

        <div>
            <label htmlFor='surname'>Last name</label>
            <span id='surname'>
                {student.surname ? <span >{student.surname}</span> : <span className='error'>{'surname not given'}</span>}
            </span>
        </div>

        <div>
            <label htmlFor='city'>City</label>
            <span id='city'>{student.city && student.city.name}</span>
        </div>

        <div>
            <label htmlFor='group'>Group</label>
            <span id='group'>{student.group && student.group.title}</span>
        </div>

       <Grades
           classes={classes} 
           student={student}
           gradeInput={gradeInput}
           setGradeInput={setGradeInput}
           onAddGrade={addGradeHandler}
           addingGrade={addingGrade}
           isEditing={isEditing}
           setStudent={setStudent}
           onDelete={deleteGradeHandler}
       />


        <button onClick={() => setIsEditing(true)}>Edit student</button>
        <button onClick={deleteStudentHandler}>Delete student</button>
    </div>}
    </>
  )
}

export default Student
