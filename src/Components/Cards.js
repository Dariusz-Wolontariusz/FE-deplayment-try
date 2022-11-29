import React, { useState } from 'react'
import Card from './Card'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Cards = ({ names, deleteName, setNames, toggleActivator }) => {

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(names);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNames(items);
  }


  return (
    <>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='members'>
      {(provided) => (
        <ul className='name__list'
        {...provided.droppableProps} ref={provided.innerRef} >
          { names &&
            names.map((person, index) => (
            <Draggable key={person.id} draggableId={person.id} index={index}>
            {(provided) => (
                <Card
                innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                  id={person.id}
                  person={person.name}
                  isActive={person.isActive}
                  toggleActivator={toggleActivator}
                  deleteName={deleteName}
                  setNames={setNames}
                  names={names}
                  />
            )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
        )}
      </Droppable>
    </DragDropContext>
    </>
  )
}

export default Cards