import React, { useState } from 'react'
import Container from '../components/General/Container'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import config from '../config'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [selectedUser, setSelectedUser]= useState('')

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [code, setCode] = useState('')
  const [codeErr, setCodeErr] = useState('')
  
  let redirect = useNavigate()
  const createUserHandler = (e) => {
    e.preventDefault()

    // axios.post(`${config.API_URL}/users`, {
    //   username,
    //   password,
    //   email,
    //   userRoleId: selectedUser === 'teacher' ? 1 : 2
    // })
    //   .then(res => {
    //     console.log(res);
    //     if (res.status === 201) {
    //       setUsername('')
    //       setPassword('')
    //       setEmail('')
    //       setSelectedUser('')
    //       localStorage.setItem('loggedIn', JSON.stringify(true))
    //       localStorage.setItem('userRole', (res.data.userRoleId === 1 ? 'administrative' : 'user'))
    //       return (
    //         window.location.reload(true),
    //         redirect('/')
    //       )
    //     }
    //   })

    
// ASYNC AWAIT ir issikelti in funkcijas
    axios.get(`${config.API_URL}/students?code=${code}`)
      .then(response => {
        if (response.status === 200 && response.data.length > 0) {

          axios.post(`${config.API_URL}/users`, {
            username,
            password,
            email,
            userRoleId: selectedUser === 'teacher' ? 1 : 2
          })
            .then(res => {
              if (res.status === 201) {
                localStorage.setItem('loggedIn', JSON.stringify(true))
                localStorage.setItem('userRole', (res.data.userRoleId === 1 ? 'administrative' : 'user'))
                localStorage.setItem('user-role-id', res.data.userRoleId)
                
                axios.patch(`${config.API_URL}/students/${response.data[0].id}`, {
                  code: null,
                  userId: res.data.id
                })
                  .then(res => {
                    if (res.status === 200) {
                      setUsername('')
                      setPassword('')
                      setEmail('')
                      setSelectedUser('')
                      setCode('')
                      setCodeErr('')
                      return (
                        window.location.reload(true),
                        redirect('/')
                      )
                    }
                  })
              }
            })
        } else {
          setCodeErr(true)
        }
      })

  }

  return (
    <Container>
      <Box
        margin={2}
        maxWidth='300px'
      >
        <Stack direction='row' justifyContent='space-around' flexWrap='wrap'>
          <Typography marginBottom={2} variant='h6' component='h1'>What account are you creating?</Typography>
          <Paper
            sx={{ p: 2, cursor: 'pointer'}}
            onClick={() => setSelectedUser('teacher')}
            elevation={selectedUser === 'teacher' ? 5 : 1}
          >
            <Typography variant='h6'>Teacher</Typography>
          </Paper>

          <Paper
            sx={{ p: 2, cursor: 'pointer'}}
            onClick={() => setSelectedUser('student')}
            elevation={selectedUser === 'student' ? 5 : 1}
          >
            <Typography variant='h6'>Student</Typography>
          </Paper>
        </Stack>
      </Box>

      {selectedUser && (
         <Paper sx={{ padding: 4, marginTop: 5, marginLeft: 2, maxWidth: '250px' }}>
          <Box
            component='form'
            // marginTop={5}
            // marginLeft={2}
            // maxWidth='250px'
            onSubmit={createUserHandler}
          >
            {selectedUser === 'student' && (
              <Stack
                direction='column'
                spacing={2}
              >
                <Typography>Type in your information</Typography>
                <TextField
                  size='small'
                  label='Username'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  size='small'
                  label='Email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  size='small'
                  label='Password'
                  type='password'
                  autoComplete='new-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  error={codeErr}
                  size='small'
                  label='Student code'
                  type='text'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Button type='submit' variant='contained'>Create</Button>

                <Box sx={{
                  '& a': {
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 500,
                    '&:hover': {
                      color: 'gray'
                    }
                  } 
                }}>
                  <Typography sx={{ display: 'inline', pr: 1 }} variant='body2'>Already have an account?</Typography>
                  <Link to={`/`}>Log in</Link>
                </Box>
              </Stack>
            )} 

            {selectedUser === 'teacher' && (
              <Stack
                direction='column'
                spacing={2}
              >
                <Typography>Type in your information</Typography>
                <TextField
                  size='small'
                  label='Username'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  size='small'
                  label='Email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  size='small'
                  label='Password'
                  type='password'
                  autoComplete='new-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type='submit' variant='contained'>Create</Button>

                <Box sx={{
                  '& a': {
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 500,
                    '&:hover': {
                      color: 'gray'
                    }
                  } 
                }}>
                  <Typography sx={{ display: 'inline', pr: 1 }} variant='body2'>Already have an account?</Typography>
                  <Link to={`/`}>Log in</Link>
                </Box>
              </Stack>
            )}
          </Box>
        </Paper>
      )}
    </Container>
  )
}

export default RegisterPage