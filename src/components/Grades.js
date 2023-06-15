import React, { useEffect, useState } from 'react'
import ClassGrades from './ClassGrades'
import AverageGrades from './AverageGrades'

const Grades = ({classes, student, gradeInput, setGradeInput, onAddGrade, addingGrade, isEditing, setStudent, onDelete}) => {
  const [selectValue, setSelectValue] = useState('default')

  return (
    <> 
    <h3>Grades</h3>
    <div className='grades'>
        {classes.map(oneClass => {
            let classGrades = student.grades && student.grades.filter(grade => grade.classId == oneClass.id)

            return (
              <ClassGrades
                key={oneClass.id} 
                classGrades={classGrades}
                oneClass={oneClass}
                gradeInput={gradeInput}
                setGradeInput={setGradeInput}
                onAddGrade={onAddGrade}
                isEditing={isEditing}
                setStudent={setStudent}
                onDelete={onDelete}
              />
            ) 
        })}


        <div className='grading'>
          <h3>Average grades</h3>
          <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
            <option value='default' disabled>Select a time period</option>
            <option value='1 semester'>1 semester</option>
            <option value='2 semester'>2 semester</option>
            <option value='Full year'>Full year</option>
          </select>


          {selectValue == '1 semester' && 
            <AverageGrades
              start='2022-08-31'
              end='2023-01-28'
              classes={classes}
              student={student}
              selectValue={selectValue}
              addingGrade={addingGrade}
              isEditing={isEditing}
            />
          }
          {selectValue == '2 semester' && 
            <AverageGrades
              start='2023-01-27'
              end='2023-06-16'
              classes={classes}
              student={student}
              selectValue={selectValue}
              addingGrade={addingGrade}
              isEditing={isEditing}
            />
          }
          {selectValue == 'Full year' && 
            <AverageGrades
              start='2022-08-31'
              end='2023-06-16'
              classes={classes}
              student={student}
              selectValue={selectValue}
              addingGrade={addingGrade}
              isEditing={isEditing}
            />
          }
      </div>
    </div>
    </>
  )
}

export default Grades