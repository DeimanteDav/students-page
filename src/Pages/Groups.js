import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Groups.css'

const Groups = () => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/groups?_embed=students')
            .then(response => setGroups(response.data))
    }, [])
    
  return (
    <>
    <h3>Groups</h3>
    <ul className='groups'>{groups.map(group => {
        return (
        <li key={group.id}>
            <Link to={`/groups/${group.id}`}>{group.title}</Link>
            <span>{group.students.length} Students</span>
        </li>
        )
    })}</ul>
    </>
  )
}



export default Groups