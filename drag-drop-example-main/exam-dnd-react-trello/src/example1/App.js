import React from 'react';
import initialData from './initial-data';
import Column from './Column';
import { DragDropContext, Droppable  } from "react-beautiful-dnd";
import './style.css';

class App extends React.Component {
  state = initialData
  
  onDragStart = (start) => {
    // document.body.style.color = 'orange';
    // document.body.style.transition = 'background-color 0.2s ease';

    // #2
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
    this.setState({
      homeIndex,
    }); // - #2
  }

  onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination 
      ? destination.index /Object.keys(this.state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }
  
  // перенос карточек по одному столбцу
  onDragEnd_v1 = (result, type) => {
    // document.body.style.color = 'inherit';  document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';
    
    const {destination, source, draggableId } = result;
  
    if(!destination) {
      return;
    }
  
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
  
    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
  
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
  
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };
  
    this.setState(newState);    
  };

  // перенос карточек по многим столбцам
  onDragEnd_v2 = (result, type) => {
    // #2
    this.setState({
      homeIndex: null,
    }); // - #2

    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';
  
    const {destination, source, draggableId } = result;
  
    if(!destination) {
      return;
    }
  
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    
    if(result.type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
    
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
      return;
    }
  
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
  
    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...finish,
        taskIds: newTaskIds,
      };
    
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };
    
      this.setState(newState);
      return;  
    }
  
    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext 
        onDragEnd={this.onDragEnd_v2} 
        onDragStart={this.onDragStart} 
        onDragUpdate={this.onDragUpdate}
      >
        <Droppable droppableId="all-columns" direction="horizontal" type="column">

          {(provided) => (
            <div className="ContainerApp"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
              
              {/* #2 */}
              const isDropDisabled = false;//index < this.state.homeIndex;
              
              return <Column key={column.id} column={column} tasks={tasks} index={index} isDropDisabled={isDropDisabled} />;
            })}
            {provided.placeholder}
          </div>
          )}

        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;
