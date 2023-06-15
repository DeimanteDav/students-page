import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Settings.css'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

const Settings = () => {
    const [cities, setCities] = useState([])
    const [groups, setGroups] = useState([])
    const [classes, setClasses] = useState([])

    const [cityInput, setCityInput] = useState('')
    const [groupInput, setGroupInput] = useState('')
    const [classInput, setClassInput] = useState('')

    const [isDeleting, setIsDeleting] = useState(false)

    const [cityIsEditing, setCityIsEditing] = useState(false)
    const [groupIsEditing, setGroupIsEditing] = useState(false)
    const [classIsEditing, setClassIsEditing] = useState(false)

    const [cityIsLoading, setCityIsLoading] = useState(true)
    const [groupIsLoading, setGroupIsLoading] = useState(true)
    const [classIsLoading, setClassIsLoading] = useState(true)


    useEffect(() => {
        axios.get('http://localhost:3000/cities?_sort=id&_order=desc')
            .then(response => {
                if (response.statusText === 'OK') {
                    setCities(response.data)
                    setCityIsLoading(false)
                }
            })
    }, [isDeleting])

    const deleteCityHandler = (id) => {
        axios.delete(`http://localhost:3000/cities/${id}`)
        setIsDeleting(prevState => !prevState)
    }
    
    const editCityHandler = (id, i, e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/cities/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: cities[i].name
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => {
                if (response.ok) {
                    setCityIsEditing(false)
                }
            })
    }

    let citiesList = cities.map((city, i) => {
        return (
            <li key={city.id}>
                {cityIsEditing  === city.id ?
                <form onSubmit={(e) => editCityHandler(city.id, i, e)}>
                    <input value={cities[i].name} onChange={(e) => setCities(prevState => {
                        let newState = [...prevState]
                        newState[i] = {
                            ...newState[i],
                            name: e.target.value
                        }
                        return newState
                    })}></input>
                    <button onClick={() => setCityIsEditing(false)}>Cancel</button>
                    <button type='submit'>Save</button>
                </form> :
                <>
                    <span>{city.name}</span>
                    <button onClick={() => deleteCityHandler(city.id)}>X</button>
                    <button onClick={() => setCityIsEditing(city.id)}>edit</button>
                </>
                }
            </li>
        )
    })

    const addCityHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/cities', {
            name: cityInput
        })
            .then(response => {
                if (response.status === 201) {
                    setCityInput('')
                    setCities(prevState => {
                        let newState = [...prevState]
                        newState.unshift(response.data)
                        return newState
                    })
                }
            })
        
    }

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
                     <button onClick={() => setGroupIsEditing(false)}>Cancel</button>
                    <button type='submit'>Save</button>
                </form> :
                <>
                    <span>{group.title}</span>
                    <button onClick={() => deleteGroupHandler(group.id)}>X</button>
                    <button onClick={() => setGroupIsEditing(group.id)}>edit</button>
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
                console.log(res);
                setIsDeleting(prevState => !prevState)
            })
    }

    const editClassHandler = (id, i, e) => {
        e.preventDefault()
        axios.patch(`http://localhost:3000/classes/${id}`, {
            name: classes[i].name
        })
            .then(res => {
                console.log(res);
                setClassIsEditing(false)
            })
    }


    console.log(classes);
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
                    <button onClick={() => setClassIsEditing(false)}>Cancel</button>
                    <button type='submit'>Save</button>
                </form> :
                <>
                    <span>{oneClass.name}</span>
                    <span className='teacher'> {oneClass.teacher ?
                    <Link to={`/teachers/${oneClass.teacher.id}`}>{oneClass.teacher.name + ' ' + oneClass.teacher.surname}</Link>:
                     'no teacher assigned'}</span>
                    <button onClick={() => deleteClassHandler(oneClass.id)}>X</button>
                    <button onClick={() => setClassIsEditing(oneClass.id)}>edit</button>
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


    
  return (
    <div className='settings'>
        {groupIsLoading && cityIsLoading ? (
            <div className='loading-wrapper'>
                <ClipLoader className='loading' color="#36d7b7" />
            </div>
        ) :
        (
        <>
            <form onSubmit={addCityHandler}>
                <h3>Cities</h3>
                <h4>Add a city</h4>
                <input
                    placeholder='Type a city name...'
                    value={cityInput} onChange={(e) => setCityInput(e.target.value)}
                />
            </form>
            <ul className='cities'>{citiesList}</ul>
    
            <form onSubmit={addGroupHandler}>
                <h3>Groups</h3>
                <h4>Add a group</h4>
                <input
                    placeholder='Type a group title...'
                    value={groupInput} onChange={(e) => setGroupInput(e.target.value)}
                />
            </form>
            <ul className='groups'>{groupsList}</ul>

            <form onSubmit={addClassHandler}>
                <h3>Classes</h3>
                <h4>Add a class</h4>
                <input
                    placeholder='Type a class name...'
                    value={classInput} onChange={(e) => setClassInput(e.target.value)}
                />
            </form>
            <ul className='classes'>{classesList}</ul>
        </>
        )}
    </div>
  )
}

export default Settings