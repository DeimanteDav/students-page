import './App.css';
import { Routes, Route } from 'react-router-dom';
import StudentsPage from './Pages/Students/StudentsPage';
import Student from './Pages/Students/Student';
import Settings from './Pages/Settings/Settings';
import Groups from './Pages/Groups/Groups';
import Group from './Pages/Groups/Group';
import Teachers from './Pages/Teachers/Teachers';
import Teacher from './Pages/Teachers/Teacher';
import StyleTestPage from './Pages/StyleTestPage';
import { useEffect, useState } from 'react';
import SchoolsPage from './Pages/Schools/SchoolsPage';
import School from './Pages/Schools/School';
import City from './Pages/City/City';
import CitySchools from './Pages/City/CitySchools';
import CityStudents from './Pages/City/CityStudents';
import SchoolStudents from './Pages/Schools/SchoolStudents';
import SchoolTeachers from './Pages/Schools/SchoolTeachers';
import SchoolGroups from './Pages/Schools/SchoolGroups';
import LogInPage from './Pages/LogInPage';
import RegisterPage from './Pages/RegisterPage';
import config from './config';
import axios from 'axios';
import LocalStorage from './Pages/LocalStorage';
import Page404 from './Pages/Page404';
import Navigation from './components/Navigation';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [loggedInUserId, setLoggedInUserId] = useState('')

  const [loggedInStudentId, setLoggedInStudentId] = useState('')

  const [rolesPermissions, setRolesPermissions] = useState(null)
  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem('loggedIn')))
    setUserRole(localStorage.getItem('userRole'))
    setLoggedInUserId(localStorage.getItem('logged-in-user-id'))

    axios.get(`${config.API_URL}/rolesPermissions?userRoleId=${localStorage.getItem('user-role-id')}`)
      .then(res => setRolesPermissions(res.data[0]))
    

    if (userRole === 'user') {
      axios.get(`${config.API_URL}/students?userId=${loggedInUserId}`)
        .then(res => {
          if (res.data.length > 0) {
            setLoggedInStudentId(res.data[0].id)
          }
        })
    }


  }, [loggedInUserId, userRole])


  return ( 
    <>
      {isLoggedIn && (
        <Navigation role={userRole} userId={loggedInUserId} />
      )}

      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<StudentsPage/>}/>
            <Route path='/students/:studentId' element={<Student loggedInStudentId={loggedInStudentId} permissions={rolesPermissions && rolesPermissions.grades} />}/>
            <Route path='/settings' element={<Settings/>}/>
            <Route path='/groups' element={<Groups/>}/>
            <Route path='/groups/:groupId' element={<Group/>}/>
            <Route path='/teachers' element={<Teachers/>}/>
            <Route path='/teachers/:teacherId' element={<Teacher/>}/>
            <Route path='/style-test' element={<StyleTestPage/>}/>
            <Route path='/schools' element={<SchoolsPage/>}/>
            <Route path='/schools/:schoolId' element={<School/>}/>
            <Route path='/schools/:schoolId/teachers' element={<SchoolTeachers/>}/>
            <Route path='/schools/:schoolId/students' element={<SchoolStudents/>}/>
            <Route path='/schools/:schoolId/groups' element={<SchoolGroups/>}/>
            <Route path='/cities/:cityId' element={<City/>}/>
            <Route path='/cities/:cityId/schools' element={<CitySchools/>}/>
            <Route path='/cities/:cityId/students' element={<CityStudents/>}/>
            <Route path='/local-storage' element={<LocalStorage/>}/>
          </>
        ) : (
          <>
            <Route path='/' element={<LogInPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </>
        )}
        <Route path="*" element={<Page404/>} />
      </Routes>
    </>
  );
}

export default App;
