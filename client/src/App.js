import React, { Component } from 'react';
import './App.css';
import Project from './Project';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.submitNewProject = this.submitNewProject.bind(this);
    this.showProjects = this.showProjects.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
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
    this.toggleForm();
    
    let data = {
      title: e.target.querySelector("#form-title").value,
      body: e.target.querySelector("#form-content").value,
      requester: e.target.querySelector("#form-requester").value,
      url: e.target.querySelector("#form-url").value,
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
  
  toggleForm() {
    let suggestionForm = document.getElementById('new-project-form');
    let overlay = document.getElementById('overlay');
    if (suggestionForm.hasAttribute('hidden')) {
      suggestionForm.removeAttribute('hidden');
      overlay.removeAttribute('hidden');
    } else {
      suggestionForm.setAttribute("hidden", true);
      overlay.setAttribute("hidden", true);
    }
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className="grid-wrapper">
          {/* Column 1 */}
          <h2 className="column-title" id="submitted">Submitted</h2>
          <button onClick="" id="suggest-button" onClick={this.toggleForm}>Suggest a new project</button>
          <div className="project-collection">
            {this.state.projects.map(element => {
              return (
                <Project title={element.title} body={element.body}/>
              )
            })}
          </div>

          {/* Column 2 */}
          <h2 className="column-title" id="in-progress">In Progress</h2>

          {/* Column 3 */}
          <h2 className="column-title" id="done">Done</h2>

        </div>
        <div hidden="true" id="overlay" onClick={this.toggleForm}></div>
        <div hidden="true" id="new-project-form">
          <form onSubmit={this.submitNewProject}> 
            <h2> Submit a new project</h2>
            <label for="form-requester">Requester Name</label>
            <input name="form-requester" id="form-requester"></input>
            <label for="form-title">Title of Project</label>
            <input name="form-title" id="form-title"></input>
            <label for="form-content">tell us about the project</label>
            <textarea name="form-content" id="form-content"></textarea>
            <label for="form-url">add a link to more information</label>
            <input name="form-url" id="form-url"></input>
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
