import React from "react";
import { connect } from "react-redux";
import { addMessage } from "./store";

// React:

class Presentational extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };

    this.submitMessage = this.submitMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({ input: event.target.value })
  }

  submitMessage(){
    // Вызов submitNewMessage, который был сопоставлен с реквизитами Presentational, с новым сообщением;
    this.props.submitNewMessage(this.state.input);
    this.setState({ input: '' });
  }


  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input onChange={this.handleChange} value={this.state.input}/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.props.messages.map((x, i)=>{
            return <li key={i}>{x}</li>
          })}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (Presentational);
