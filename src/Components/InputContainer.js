import React from 'react'
import { useState } from 'react'

const Input = ({ addName }) => {
  const [inputValue, setInputValue] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    addName(inputValue)
    setInputValue('')
  }

  return (
    <form
      className='input'
      onSubmit={ onSubmit }>
      <input
        className='name-list__input'
        type='text'
        placeholder='Add new member'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button
        className='name-list__button'
        type='submit'
      >Add</button>
    </form>
  )
}

export default Input