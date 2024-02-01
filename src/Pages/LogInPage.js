import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import config from '../config';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';

const LogInPage = () => {
    // localStorage.setItem('loggedIn', JSON.stringify(false))
    // console.log(JSON.parse(localStorage.getItem('loggedIn')));
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    
    let navigate = useNavigate()
    const logInHandler = (e) => {
        e.preventDefault()
        console.log(username);
        console.log(password);
        setError(false)

        axios.get(`${config.API_URL}/users?${(username.includes('@') ? `gmail=${username}` : `username=${username}`)}&password=${password}&_expand=userRole`)
            .then(res => {
                if (res.status === 200 && res.data.length > 0) {
                    setUsername('')
                    setPassword('')
                    localStorage.setItem('loggedIn', JSON.stringify(true))
                    localStorage.setItem('userRole', (res.data[0].userRole.name))
                    localStorage.setItem('logged-in-user-id', res.data[0].id)
                    localStorage.setItem('user-role-id', res.data[0].userRoleId)
                    navigate(0)
                } else {
                    setError(true)
                    setUsername('')
                    setPassword('')
                }
            })
            .catch(err => console.error(err))
    }

  return (
    <Container>
        <Paper sx={{ padding: 4, margin: 2, maxWidth: '250px' }}>
            <Box
                component='form'
                onSubmit={logInHandler}
                className={error && 'error'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >

                {error && (
                    <Typography color='red' variant='body2'>Incorrect username/email or password</Typography>
                )}
                <TextField
                    error={error && true}
                    size='small'
                    label='Username or email'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField 
                    error={error && true}
                    size='small'
                    label='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant='contained' type='submit' color={error ? 'error' : 'primary'}>Log In</Button>

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
                    <Typography sx={{ display: 'inline', pr: 1 }} variant='body2'>Don't have an account?</Typography>
                    <Link to={`/register`}>Register</Link>
                </Box>

            </Box>
        </Paper>
    </Container>

  )
}

export default LogInPage