import React from 'react'
import Input from './InputContainer'
import Cards from './Cards'
import { v4 as uuidv4 } from 'uuid'
import { useContext, useEffect, useState } from 'react'
import MainContext from '../Context'


// const LOCAL_STORAGE_KEY = 'final_project';

const Names = () => {
  const { names, setNames } = useContext(MainContext)
  const { mobName } = useContext(MainContext)
  const { isChanging, setIsChanging } = useContext(MainContext)
  const [idToToggle, setIdToToggle] = useState('')
  // const [isActive, setIsActive] = useState(false)

  // useEffect(() => {
  //   const nameStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   if (nameStorage) {
  //     setNames(nameStorage)
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(names))
  // }, [names])

  const addName = name => {
    const id = uuidv4();
    if (names.length === 0) {
      setNames([...names, { id, name, isActive: true }])
    }
    else {
      setNames([...names, { id, name, isActive: false }])
    }
  }

  //delete name
  const deleteName = id => {
    const currentActiveIndex = names.findIndex(person => person.isActive);
    const isItemToDeleteActive = names[currentActiveIndex].id === id;
    let updatedNames = [];
    if (isItemToDeleteActive) {
      let nextPersonId;
      updatedNames = names.map((person, index) => {
        if (index === currentActiveIndex && person.isActive) {
          if(names[currentActiveIndex + 1]) {
            nextPersonId = names[currentActiveIndex + 1].id;
          } else if (names.length) {
            nextPersonId = names[0].id;
          }
          return {
            ...person,
            isActive: false
          }
        }
        return person;
      }).filter(person => person.id !== id);
      updatedNames = updatedNames.map(person => {
        if (person.id === nextPersonId) {
          return {
            ...person,
            isActive: true
          }
        }
        return person;
      })
    } else {
      updatedNames = names.filter(person => person.id !== id);
    }
    setNames(updatedNames)
    
    // if (nameToRemove[0].isActive === true) {
    //   // const index = names.map(person => person.isActive).indexOf(true)
    //   // setIdToToggle(names[index].id)
    //   setNames(names.filter(person => person.id !== id))
    //   makeNextPersonIsActive()
    //   console.log('Darek is inside', names)
    // }
    // setNames(names.filter(person => person.id !== id))
  }
  console.log('Darek is outside', names)

// useEffect(() => {
//   toggleActivator(idToToggle)

// }, [idToToggle])



  // toggle activator
  const toggleActivator = (id) => {
    setNames(names.map(person => (person.id !== id) ? { ...person, isActive: false } : { ...person, isActive: true }))
  }

  const makeNextPersonIsActive = () => {
    const isActiveIndex = names.map(person => person.isActive).indexOf(true)
    toggleActivator(names[isActiveIndex].id)
    if (isActiveIndex === names.length - 1) {
      toggleActivator(names[0].id)
    } else {
      toggleActivator(names[isActiveIndex + 1].id)
    }

  }
  // useEffect(() => {
  //   if (isChanging) {
  //     makeNextPersonIsActive()
  //   }
  // }, [isChanging])
  return (
    <div className='input-and-cards'>
      <button onClick={makeNextPersonIsActive}> Click </button>
      <Input
        names={names}
        addName={addName} />
      <Cards
        toggleActivator={toggleActivator}
        setNames={setNames}
        names={names}
        deleteName={deleteName}
      />
    </div>
  )
}

export default Names