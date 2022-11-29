import React from 'react'
import { MdDelete } from "react-icons/md";

const Card = (props) => {
  const { setNames, names, person, deleteName, id, isActive, toggleActivator, innerRef, ...extraProps } = props

  const handleClick = (e, id) => {
    e.stopPropagation()
    deleteName(id)
    console.log('do usuniecia')
  }

  return (
    <li className={`name-list__card ${isActive === true ? 'card--active' : ''}`}
      onClick={() => toggleActivator(id)}
      {...extraProps} ref={innerRef}
    >
      <p className='person'>{person}</p>
      <MdDelete
        className='name-list__card--button'
        style={{ color: 'red', cursor: 'pointer', margin: '0.5rem' }}
        onClick={(e) => handleClick(e, id)}
      />
    </li>
  )
}

export default Card