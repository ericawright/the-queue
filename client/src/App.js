import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    // getting all posts from DB
    const response = await fetch('/api/projects');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body.message;
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
