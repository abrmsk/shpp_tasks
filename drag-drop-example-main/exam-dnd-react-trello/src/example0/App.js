import React, {useState} from "react";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';

const itemFromBackend = [
  {id: 1, content: 'First task'},
  {id: 2, content: 'Second task'},
  {id: 3, content: 'Third task'},
  {id: 4, content: 'Four task'},
  {id: 5, content: 'Five task'},
  {id: 6, content: 'Six task'},
];

// todo: our columns should be an object, not an array
const columnsFromBackend = {
  [uuid()]: {
    name: 'Requested',
    items: itemFromBackend,
  },
  [uuid()]: {
    name: 'Todo',
    items: [],
  },
  [uuid()]: {
    name: 'In Progress',
    items: [],
  },
  [uuid()]: {
    name: 'Done',
    items: [],
  }
};


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const {source, destination} = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      }
    });

  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    // debugger;
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      }
    });
  }

}

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div style={{display: 'flex', flexDirection: "column", height: '100%'}}>
      <h1 style={{textAlign: "center", margin: 0, padding: 0,}}>Drag and Drop Example</h1>

      <main style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div>
                <h2 style={{ display: 'flex', justifyContent: "center", marginBottom: 10 }}>{column.name}</h2>
                <div style={{ margin: 4 }}>


                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          background: snapshot.isDraggingOver ? 'lightblue' : 'lightgray',
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                          // border: '1px solid #000',
                          borderRadius: 8,
                        }}
                      >
                        {column.items.map((item, index) => {
                          const id = `${item.id}`;
                          return (
                            <Draggable key={id} draggableId={id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      minHeight: 50,
                                      backgroundColor: snapshot.isDraggingOver ? '#263B4A' : '#456c86',
                                      border: '1px solid #fafafa',
                                      borderRadius: 7,
                                      color: 'white',
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {`${id}, ${item.content}`}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
                </div>
              </div>
            );

          })}
        </DragDropContext>

      </main>
    </div>
  );
}

export default App;
