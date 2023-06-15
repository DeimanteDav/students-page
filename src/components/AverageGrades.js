import { type } from '@testing-library/user-event/dist/type'
import React, { useEffect, useState } from 'react'

const AverageGrades = ({start, end, classes, student, selectValue, addingGrade, isEditing}) => {
  const [gradesArr, setGradesArr] = useState([])
    
    useEffect(() => {
        setGradesArr(classes.map(oneClass => {
            let classGrades =  student.grades && student.grades.filter(grade => grade.classId == oneClass.id)
                return classGrades.map(grade => ({value: grade.value, date: grade.date}))
        }))
    }, [selectValue, addingGrade, isEditing])

    let average = gradesArr && gradesArr.map(gradeObj => {
        let filteredGrades = gradeObj.filter(grade => {
            
            console.log((new Date(grade.date)).getMonth());

            return new Date(grade.date) < new Date(end) && new Date(grade.date) > new Date(start)
        })

        let grades = filteredGrades.map(grade => grade.value)
        return grades.length > 0 ? Math.round(100 * (grades.reduce((x, y) => x + y) / grades.length)) / 100 : 'No grades'
    })


    return (
        <div className='grades-list'>
            {classes.map((oneClass, i) => {
                return (
                <div key={i}>
                    <h4>{oneClass.name}</h4>
                    <span>{average[i]}</span>
                </div>
                )
            })}
           {[...average].length > 0 && <div>
                <h4>AVERAGE</h4>
                <span>
                    {[...average].filter(grade => typeof grade === 'number').length > 0 ?
                    Math.round(100 * ([...average].filter(grade => typeof grade === 'number').reduce((x, y) => x + y) / [...average].length)) / 100 :
                    'No grades'
                    }
                </span>
            </div>}
        </div>
    )
}

export default AverageGrades