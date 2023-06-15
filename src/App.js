import logo from './logo.svg';
import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import StudentsPage from './Pages/StudentsPage';
import Container from './components/Container';
import Student from './Pages/Student';
import Settings from './Pages/Settings';
import Groups from './Pages/Groups';
import Group from './Pages/Group';
import Teachers from './Pages/Teachers';
import Teacher from './Pages/Teacher';

function App() {
  return ( 
    <>
      <Container>
        <nav className='navigation'>
          <ul>
            <li><NavLink to='settings'>Settings</NavLink></li>
            <li><NavLink to='/'>All Students</NavLink></li>
            <li><NavLink to='groups'>Groups</NavLink></li>
            <li><NavLink to='teachers'>Teachers</NavLink></li>
          </ul>
        </nav>

        <Routes>
          <Route path='/' element={<StudentsPage/>}/>
          <Route path='/students/:studentId' element={<Student/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/groups' element={<Groups/>}/>
          <Route path='/groups/:groupId' element={<Group/>}/>
          <Route path='/teachers' element={<Teachers/>}/>
          <Route path='/teachers/:teacherId' element={<Teacher/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
