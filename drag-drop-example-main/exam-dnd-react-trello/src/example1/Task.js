import React from 'react';
import { Draggable } from "react-beautiful-dnd";
// import styled from 'styled-components';

// const Container = styled.div`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
//   background-color: ${props => (props.isDragging ? 'lightGreen' : 'white')};
// `;
// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: orange;
//   border-radius: 4px;
//   margin-right: 8px;
// `


export default class Task extends React.Component {
  render() {
    const isDragDisabled = false; // = this.props.task.id === 'task-1';
    
    return (
      <Draggable 
        draggableId={this.props.task.id} 
        index={this.props.index} 
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => {
          return (
            <div className="Container"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isDragging={snapshot.isDragging}
              style={{ 
                backgroundColor: snapshot.isDragging ? 'lightGreen' : 'white', 
                // backgroundColor: isDragDisabled ? 'lightgrey' : snapshot.isDragging ? 'lightGreen' : 'white',
                ...provided.draggableProps.style 
              }}
            >
              {/* <div className="Handle"
                {...provided.dragHandleProps} 
              /> */}
              {this.props.task.content[0]}
            </div>
          );
        }}
      </Draggable>
    );

    
  }
}
