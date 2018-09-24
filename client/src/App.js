import React, { Component } from 'react';
import './App.css';
import Project from './Project';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.submitNewProject = this.submitNewProject.bind(this);
    this.showProjects = this.showProjects.bind(this);
  }

  componentWillMount() {
    this.showProjects();
  }

  showProjects = async () => {
    const response = await fetch('/projects');
    let projects = await response.json();
    this.setState({projects});
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
    this.showProjects();
    console.log("response,", body);
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.submitNewProject}> 
          <h2> Submit a new project</h2>
          <label for="title">Title of Project</label>
          <input name="title" id="title"></input>
          <label for="body">tell us about the project</label>
          <textarea name="body" id="body"></textarea>
          <input type="submit"/>
        </form>
        <div>
          <h2>Project List</h2>
          <button onClick={this.showProjects}>Update Projects List</button>
          {this.state.projects.map(element => {
            return (
              <Project title={element.title} body={element.body}/>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
