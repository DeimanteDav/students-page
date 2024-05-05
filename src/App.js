import './App.css';
import { Routes, Route, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import StudentsPage from './Pages/StudentsPage';
import Student from './Pages/Student';
import Settings from './Pages/Settings';
import Groups from './Pages/Groups';
import Group from './Pages/Group';
import Teachers from './Pages/Teachers';
import Teacher from './Pages/Teacher';
import StyleTestPage from './Pages/StyleTestPage';
import { AppBar, Box, Button, IconButton, Tab, Tabs, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolsPage from './Pages/School/SchoolsPage';
import School from './Pages/School/School';
import City from './Pages/City/City';
import CitySchools from './Pages/City/CitySchools';
import CityStudents from './Pages/City/CityStudents';
import SchoolStudents from './Pages/School/SchoolStudents';
import SchoolTeachers from './Pages/School/SchoolTeachers';
import SchoolGroups from './Pages/School/SchoolGroups';
import LogInPage from './Pages/LogInPage';
import RegisterPage from './Pages/RegisterPage';
import config from './config';
import axios from 'axios';
import LocalStorage from './Pages/LocalStorage';

function App() {
  const [value, setValue] = useState(0)
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


  const handleLogOut = () => {
    localStorage.setItem('loggedIn', JSON.stringify(false))
    redirect('/')
    window.location.reload(true)
  }

  const handleTabs = (_, newValue) => {
    setValue(newValue);
  };

  let redirect = useNavigate()

  return ( 
    <div>
      {isLoggedIn && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Tabs sx={{ mr: 4 }} value={value} onChange={handleTabs} textColor='inherit'>
                {userRole === 'administrative' && (
                  <Tab label={
                    <IconButton color='inherit' aria-label='settings'>
                      <SettingsIcon/>
                    </IconButton>
                  } component={NavLink} to='settings'/>
                )}
                <Tab label='students' component={NavLink} to='/'/>
                <Tab label='groups' component={NavLink} to='groups'/>
                <Tab label='teachers' component={NavLink} to='teachers'/>
                <Tab label='schools' component={NavLink} to='schools'/>
              </Tabs>

              <Tabs textColor='inherit' value={0}>
                <Tab lable='log-out' onClick={handleLogOut}/>
              </Tabs>
            </Toolbar>
          </AppBar>
        </Box>
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
      </Routes>
    </div>

    
  );
}

export default App;
