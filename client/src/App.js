import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
    this.submitNewProject = this.submitNewProject.bind(this);
    this.showProjects = this.showProjects.bind(this);
  }

  componentDidMount() {

  }

  listProjects = async () => {
    // getting all posts from DB
    const response = await fetch('/projects');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body.message;
  }

  showProjects() {
    this.listProjects()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }
  
  submitNewProject =  async e => {
    e.preventDefault();
    
    let data = {
      title: e.target.querySelector("#title").value, 
      body: e.target.querySelector("#body").value,
    };
    console.log("data", data);
    
    const response = await fetch("/projects", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

    const body = await response.json();
    console.log("response,", body);
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">{this.state.response}</p>
        <button onClick={this.showProjects}> view projects </button>
        <form onSubmit={this.submitNewProject}> 
          <h2> Submit a new project</h2>
          <label for="title">Title of Project</label>
          <input name="title" id="title"></input>
          <label for="body">tell us about the project</label>
          <textarea name="body" id="body"></textarea>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default App;
