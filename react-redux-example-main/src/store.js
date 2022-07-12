import { createStore } from 'redux';

// Redux:

// тип действия - константa ADD
export const ADD = "ADD";

// Cоздатель действия - addMessage()
// этому создателю действия нужно передать message и включить его в возвращаемое action.
export const addMessage = message => {
  return {
    type: ADD,
    message
  };
};

// Редуктор - messageReducer() который обрабатывает состояние сообщений. 
export const reducer = (state = ['start value'], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.message];
      break;

    default:
      // A default case to fall back on in case if the update to Redux store is not for this specific state.
      // Вариант по умолчанию, к которому следует вернуться в случае, если обновление хранилища Redux не для этого конкретного состояния.
      return state;
  }
};

// Наконец, создайте хранилище Redux и передайте ему редуктор.
export const store = createStore(reducer);