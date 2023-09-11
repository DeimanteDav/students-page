import React, { useEffect, useRef, useState } from 'react'

const UseRefTest = () => {
    const [input, setInput] = useState('')

    const renderCount = useRef(0)
    const inputRef = useRef()


    const inputHandler = (e) => {
        setInput(e.target.value)
        renderCount.current++
    }

    const focusOnClick = () => {
        inputRef.current.focus()
    }

  return (
    <div>
        <input ref={inputRef} type='text' value={input} onChange={inputHandler}></input>

        <div>
            input value: {input}
        </div>

        <div>
            component rendered: {renderCount.current}
        </div>

        <button onClick={focusOnClick}>button</button>
    </div>
  )
}

export default UseRefTest