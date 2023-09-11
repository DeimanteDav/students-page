import React, { useContext } from 'react'
import StudentData from './StudentData'
import StudentContext from '../../store/student-context'


const StudentInfo = () => {
  // return (
  //   <StudentContext.Consumer>
  //     {(ctx) => {
  //       let {name, surname, group, city, school} = ctx
  //       return (
  //         <div className='info'>
  //           <StudentData label='First Name' data={name} />
  //           <StudentData label='Last Name' data={surname} />
  //           <StudentData label='Group' data={group && group.title} />
  //           <StudentData label='City' data={city && city.name} />
  //           <StudentData label='School' data={school && school.name} />
  //         </div>
  //       )
  //     }}
  //   </StudentContext.Consumer>
  // )

  const ctx = useContext(StudentContext)
  let {name, surname, group, city, school} = ctx.student

    return (
      <div className='info'>
        <StudentData label='First Name' data={name} />
        <StudentData label='Last Name' data={surname} />
        <StudentData label='Group' data={group && group.title} />
        <StudentData label='City' data={city && city.name} />
        <StudentData label='School' data={school && school.name} />
      </div>
    )
}

export default StudentInfo