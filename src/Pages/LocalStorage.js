import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const LocalStorage = () => {
    const [name, setName] = useLocalStorage('name', '')
    const [surname, setSurname] = useLocalStorage('surname', '')

  return (
    <div>
        <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <input
            type='text'
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
        />
    </div>
  )
}

export default LocalStorage