import { Grid } from '@mui/material'
import React from 'react'

const ClassGrades = ({classGrades, oneClass, gradeInput, setGradeInput, onAddGrade, isEditing, setStudent, onDelete}) => {
    
  return (
    <div className='class-grades'>
        <h4>{oneClass.name}</h4>

        {classGrades && classGrades.length > 0 ? <ul>

            {classGrades.map((grade, i) => {
                let date = new Date(grade.date)
                let updatedDate = new Date(grade.updatedDate)
                return (
                <>
                    {isEditing ?
                    <div key={grade.id}>
                        <input type='number'
                            max={10}
                            min={1}
                            value={grade.value}
                            onChange={(e) => setStudent(prevState => {
                                let newState = {...prevState}
                                newState.grades[i].value = e.target.value
                                return newState
                        })}>
                        </input>
                        <button type='button' onClick={(e) => onDelete(grade.id, e)}>X</button>
                    </div>
                        :

                    <li key={grade.id}>
                        <span>{grade.value}</span>
                        <span className='date'>{date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()}</span>
                        {grade.updatedDate && <span className='date'>Last updated: {updatedDate.getFullYear()+'-'+(updatedDate.getMonth()+1)+'-'+updatedDate.getDate()}</span>}
                    </li>
                    }
                </>
                )
            })}
        </ul> : <span>No grades</span>}

        {!isEditing &&
            <form onSubmit={(e) => onAddGrade(oneClass.id, e)} className='add-grades-form'>
                <label htmlFor='add-grades'>Add a grade</label>
                <input
                    type='number'
                    id='add-grades'
                    max={10}
                    min={1}
                    value={gradeInput.name === oneClass.name && gradeInput.value}
                    onChange={(e) => setGradeInput({name: oneClass.name, value:e.target.value})}
                />
                <button type='submit'>add</button>
            </form>
        }
    </div>
  )
}
// du pusmeciai - vidurkiai, mediana, max didz, metinis
// pusmec, metinis - visu dalyku vidurkius

/*/
1 pusmetis 2022-09-01 - 2023-01-27
2 pusmetis 2023-01-30 - 2023-06-15
Metinis 2022-09-01 - 2023-06-15
/*/

export default ClassGrades