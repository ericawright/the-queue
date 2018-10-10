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

    let title = e.target.querySelector('#form-title').value;
    let email = e.target.querySelector('#form-email').value;
    let link = e.target.querySelector('#form-link').value;
    if (!title || !link || !email) {
      // TODO: show error here
      return;
    }
    let data = {
      title,
      link,
      email,
    };
    let content = e.target.querySelector('#form-content').value;
    let name = e.target.querySelector('#form-name').value;
    if (content) {
      data.content = content;
    }
    if (name) {
      data.name = name;
    }

    const response = await fetch('/projects', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

    const result = await response.json();
    // TODO handle error here
    this.showProjects();
    console.log("response,", result);
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
                <Project title={element.title} content={element.content}/>
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
            <h2>Submit a New Project</h2>
            <label for="form-name"><span>Requester name: </span><input name="form-name" id="form-name"></input></label>
            <label for="form-email"><span>Email: * </span><input type="email" name="form-email" id="form-email" placeholder="firefox@mozilla.com"></input></label>
            <label for="form-title"><span>Title of project: * </span><input name="form-title" id="form-title"></input></label>
            <label for="form-content">Tell us about the project:</label>
            <textarea name="form-content" id="form-content"></textarea>
            <label for="form-link"><span>Link to more information: * </span><input type="url" name="form-link" id="form-link"></input></label>
            <p className="form-note">Note: fields with a * are required.</p>
            <button className="submit-button">Submit Request</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
