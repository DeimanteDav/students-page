import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Settings.scss'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Unstable_Grid2'
import Container from '../components/Container'
import { Checkbox, FormControlLabel } from '@mui/material'
import config from '../config'
import CityForm from '../components/Cities/CityForm'
import GroupsList from '../components/Groups/GroupsList'

const Settings = () => {
    const [groups, setGroups] = useState([])
    const [classes, setClasses] = useState([])

    const [groupInput, setGroupInput] = useState('')
    const [classInput, setClassInput] = useState('')

    const [isDeleting, setIsDeleting] = useState(false)

    const [groupIsEditing, setGroupIsEditing] = useState(false)
    const [classIsEditing, setClassIsEditing] = useState(false)

    const [cityIsLoading, setCityIsLoading] = useState(true)
    const [groupIsLoading, setGroupIsLoading] = useState(true)
    const [classIsLoading, setClassIsLoading] = useState(true)

    const [rolesPerm, setRolesPerm] = useState(JSON.parse(localStorage.getItem('data')))
    const [userRoles, setUserRoles] = useState([])
    const [view, setView] = useState(null)
    const [viewOwn, setViewOwn] = useState(null)
    const [viewOthers, setViewOthers] = useState(null)



    useEffect(() => {
        axios.get('http://localhost:3000/groups?_sort=id&_order=desc')
            .then(response => {
                if (response.statusText === 'OK') {
                    setGroups(response.data)
                    setGroupIsLoading(false)
            }})
    }, [isDeleting])

    const deleteGroupHandler = (id) => {
        axios.delete(`http://localhost:3000/groups/${id}`)
        setIsDeleting(prevState => !prevState)
    }

    const editGroupHandler = (id, i, e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/groups/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: groups[i].title
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => {
                if (response.ok) {
                    setGroupIsEditing(false)
                }
            })
    }

    let groupsList = groups.map((group, i) => {
         return (
            <li key={group.id}>
                {groupIsEditing === group.id ?
                <form onSubmit={(e) => editGroupHandler(group.id, i, e)}>
                    <input value={groups[i].title} onChange={(e) => setGroups(prevState => {
                        let newState = [...prevState]
                        newState[i] = {
                            ...newState[i],
                            title: e.target.value
                        }
                        return newState
                    })}></input>
                    <ButtonGroup variant="outlined" aria-label="small outlined button group" size='small'>
                        <Button variant='text' type='submit' onClick={() => setGroupIsEditing(false)}>Cancel</Button>
                        <Button variant='text' color='success' type='submit'>Save</Button>
                    </ButtonGroup>
                </form> :
                <>
                    <span>{group.title}</span>
                    <Stack direction='row' spacing={1}>
                        <IconButton aria-label="delete" size='small' onClick={() => deleteGroupHandler(group.id)}>
                            <DeleteIcon fontSize='small'/>
                        </IconButton>
                        <Button variant="outlined" size="small" onClick={() => setGroupIsEditing(group.id)}>EDIT</Button>
                    </Stack>
                </>
                }
            </li>
        )
    })

    const addGroupHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/groups', {
            title: groupInput
        })
            .then(response => {
                if (response.status === 201) {
                    setGroupInput('')
                    setGroups(prevState => {
                        let newState = [...prevState]
                        newState.unshift(response.data)
                        return newState
                    })
                }
            })
    }


    useEffect(() => {
        axios.get(`http://localhost:3000/classes?_expand=teacher&_sort=id&_order=desc`)
            .then(response => {
                setClasses(response.data)
                setClassIsLoading(false)
            })
    }, [isDeleting])

    const deleteClassHandler = (id) => {
        axios.delete(`http://localhost:3000/classes/${id}`)
            .then(res => {
                setIsDeleting(prevState => !prevState)
            })
    }

    const editClassHandler = (id, i, e) => {
        e.preventDefault()
        axios.patch(`http://localhost:3000/classes/${id}`, {
            name: classes[i].name
        })
            .then(res => {
                setClassIsEditing(false)
            })
    }


    let classesList = classes.map((oneClass, i) => {
        return (
            <li key={oneClass.id}>
                {classIsEditing  === oneClass.id ?
                <form className='edit-form' onSubmit={(e) => editClassHandler(oneClass.id, i, e)}>
                    <input value={classes[i].name} onChange={(e) => setClasses(prevState => {
                        let newState = [...prevState]
                        newState[i] = {
                            ...newState[i],
                            name: e.target.value
                        }
                        return newState
                    })}></input>
                    <ButtonGroup variant="outlined" aria-label="small outlined button group" size='small'>
                        <Button variant='text' type='submit' onClick={() => setClassIsEditing(false)}>Cancel</Button>
                        <Button variant='text' color='success' type='submit'>Save</Button>
                    </ButtonGroup>
                </form> :
                <>
                    <span>{oneClass.name}</span>
                    <span className='teacher'> {oneClass.teacher ?
                    <Link to={`/teachers/${oneClass.teacher.id}`}>{oneClass.teacher.name + ' ' + oneClass.teacher.surname}</Link>:
                     'no teacher assigned'}</span>
                    <Stack direction='row' spacing={1}>
                        <IconButton aria-label="delete" size='small' onClick={() => deleteClassHandler(oneClass.id)}>
                            <DeleteIcon fontSize='small'/>
                        </IconButton>
                        <Button variant="outlined" size="small" onClick={() => setClassIsEditing(oneClass.id)}>EDIT</Button>
                    </Stack>
                </>
                }
            </li>
        )
    })

    const addClassHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/classes`, {
            name: classInput,
            teacherId: ""
        })
            .then(response => {
                if (response.status === 201) {
                    setClassInput('')
                    setClasses(prevState => {
                        let newState = [...prevState]
                        newState.unshift(response.data)
                        return newState
                    })
                }
            })
    }



    useEffect(() => {
        axios.get(`${config.API_URL}/userRoles`)
            .then(res => setUserRoles(res.data))
    }, [])

    const roleHandler = (e, roleId) => {
        e.preventDefault()
        let elements = e.target.elements

        
        if (roleId === 1) {
            axios.patch(`${config.API_URL}/rolesPermissions/1`, {
                grades: {
                    delete: elements.delete.checked,
                    edit: elements.edit.checked,
                    add: elements.add.checked,
                    view: elements.view.checked
                }
            })
                .then(res => console.log(res.data))
        } else {
            axios.patch(`${config.API_URL}/rolesPermissions/2`, {
                grades: {
                    delete: elements.delete.checked,
                    edit: elements.edit.checked,
                    add: elements.add.checked,
                    view: elements.viewOthers.checked,
                    viewOwn: elements.viewOwn.checked
                }
            })
                .then(res => console.log(res.data))
        }
    }

    useEffect(() => {
        axios.get(`${config.API_URL}/rolesPermissions?_expand=userRole`)
            .then(res => localStorage.setItem('data', JSON.stringify(res.data)))

            setRolesPerm(JSON.parse(localStorage.getItem('data')))
    }, [])


  return (
    <Container>
        <div className='settings'>
            {groupIsLoading && cityIsLoading ? (
                <div className='loading-wrapper'>
                    <ClipLoader className='loading' color="#36d7b7" />
                </div>
            ) : (
                <Grid container spacing={2}>
                    <Grid xs={12} marginBottom={2}>
                        <h2>Grades</h2>
                        {userRoles.map(role => (
                            <form key={role.id} onSubmit={(e) => roleHandler(e, role.id)}>
                                <h3>{role.name}</h3>
                                <Stack direction='row' flexWrap='wrap'>
                                    {role.id === 1 ? (
                                        <FormControlLabel 
                                            control={<Checkbox />}
                                            label='View'
                                            name='view'
                                            onChange={(e) => setView(e.target.checked)}
                                        />
                                    ) : (
                                        <>
                                        <FormControlLabel 
                                            control={<Checkbox />}
                                            label='View own'
                                            name='viewOwn'
                                            onChange={(e) => setViewOwn(e.target.checked)}
                                            />
                                        <FormControlLabel 
                                            control={<Checkbox />}
                                            label='View other`s'
                                            name='viewOthers'
                                            onChange={(e) => setViewOthers(e.target.checked)}
                                            />
                                        </>
                                    )}
                                    <FormControlLabel 
                                        control={<Checkbox />}
                                        label='Delete'
                                        name='delete'
                                        disabled={
                                            role.id === 1 ? (
                                                !view && true
                                            ) : (
                                                (!viewOwn && !viewOthers) && true
                                            )
                                        }
                                    />
                                    <FormControlLabel 
                                        control={<Checkbox />}
                                        label='Edit'
                                        name='edit'
                                        disabled={
                                            role.id === 1 ? (
                                                !view && true
                                            ) : (
                                                (!viewOwn && !viewOthers) && true
                                            )
                                        }
                                    />
                                    <FormControlLabel 
                                        control={<Checkbox />}
                                        label='Add'
                                        name='add'
                                        disabled={
                                            role.id === 1 ? (
                                                !view && true
                                            ) : (
                                                (!viewOwn && !viewOthers) && true
                                            )
                                        }
                                    />
                                </Stack>
                                <Button type='submit' size='small' variant='contained'>save</Button>
                            </form>
                        ))}
                    </Grid>
                    <Grid xs={12} sm={6} md>
                        <CityForm setCityIsLoading={setCityIsLoading} />
                    </Grid>
                    <Grid xs={12} sm={6} md>
                        <form onSubmit={addGroupHandler} className='add-form'>
                            <h3>Groups</h3>
                            <h4>Add a group</h4>
                            <TextField
                                id="standard-size-small"
                                label="Group title"
                                variant="standard"
                                size='small'
                                value={groupInput}
                                onChange={(e) => setGroupInput(e.target.value)}
                            />
                        </form>
                        <ul className='groups'>{groupsList}</ul>
                    </Grid>
                    <Grid xs={12} sm={6} md>
                        <form onSubmit={addClassHandler} className='add-form'>
                            <h3>Classes</h3>
                            <h4>Add a class</h4>
                            <TextField
                                id="standard-size-small"
                                label="Class name"
                                variant="standard"
                                size='small'
                                value={classInput}
                                onChange={(e) => setClassInput(e.target.value)}
                                />
                        </form>
                        <ul className='classes'>{classesList}</ul>
                    </Grid>
                </Grid>
            )}
        </div>
    </Container>
  )
}

export default Settings