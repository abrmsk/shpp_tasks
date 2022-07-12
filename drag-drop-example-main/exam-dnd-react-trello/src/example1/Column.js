import React from 'react';
import Task from "./Task";
import { Droppable, Draggable } from 'react-beautiful-dnd';
// import styled from 'styled-components';

// const Container = styled.div`
//   margin: 8px;
//   border: 1px solid lightgrey;
//   border-radius: 2px
// `;
// const Title = styled.h3`
//   padding: 8px;
// `;
// const TaskList = styled.div`
//   padding: 8px;
//   transition: background-color 0.2s ease;
//   background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
// `;

export default class Column extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>

        {(provided) => (
          <div className="ContainerColumns"
            ref={provided.innerRef}
            {...provided.draggableProps} 
          >
            
            <div className="Title"
              {...provided.dragHandleProps}
            >
              {this.props.column.title}
            </div>
            
            <Droppable 
              droppableId={this.props.column.id}
              type="task"
              // Два варианта активного столбца или нет
              // 1
              // type={this.props.column.id === 'column-3' ? 'done' : 'active'}
              // #2
              // isDropDisabled={this.props.isDropDisabled}
              // direction="horizontal"
            >
              {(provided, snapshot) => {
                return (
                  <div className="TaskList"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    style={{ backgroundColor: snapshot.isDraggingOver ? 'skyblue' : 'white' }}
                  >
                    {this.props.tasks.map((task, index) => 
                      <Task key={task.id} task={task} index={index} />
                    )}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>

          </div>
        )}

      </Draggable>
    );
  }
}
