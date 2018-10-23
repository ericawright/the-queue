import '../styles/App.css';
import React, {Component} from 'react';
import Column from './Column';
import Header from './Header';
import Modal from './Modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      show_modal: false,
      active_project: {},
    };
    this.showProjects = this.showProjects.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.submitNewProject = this.submitNewProject.bind(this);
    this.submitEditedProject = this.submitEditedProject.bind(this);
    this.inspectProject = this.inspectProject.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.showProjects();
  }
  
  inspectProject(active_project) {
    console.log("setting active project", active_project)
    this.setState({active_project, show_modal: true});
  }
  
  //todo close 

  showForm() {
    this.setState({show_modal: true});
  }

  hideForm() {
    this.setState({show_modal: false, active_project: {}});
  }

  async showProjects() {
    const response = await fetch('/projects');
    let projects = await response.json();

    this.setState({projects});
  }
  
  async submitNewProject(e) {
    console.log("new submit")
    e.preventDefault();

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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    // TODO handle error here
    this.showProjects();
    console.log('response,', result);
    this.hideForm();
  }
  // TODO can these be combined?
  async submitEditedProject(e, id) {
    console.log("edited submit")
    e.preventDefault();

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
    let status = e.target.querySelector('#form-status').value;
    if (content) {
      data.content = content;
    }
    if (name) {
      data.name = name;
    }
    if (status) {
      data.status = status;
    }

    const response = await fetch(`/update_status/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    // TODO handle error here
    this.showProjects();
    console.log('response,', result);
    this.hideForm();
  }

  render() {
    let project_collections = new Map();
    this.state.projects.forEach(project => {
      if (project_collections.get(project.status)) {
        let project_arr = project_collections.get(project.status);
        project_arr.push(project);
        project_collections.set(project.status, project_arr);
      } else {
        project_collections.set(project.status, [project]);
      }
    });

    let columns = [];
    project_collections.forEach((projects, title) => {
      columns.push(<Column inspectProject={this.inspectProject} submitEditedProject={this.submitEditedProject} projects={projects} title={title} />);
    });

    document.documentElement.style.setProperty('--colCount', columns.length);

    return (
      <div className="App">
        <Header />
        <button id="suggest-button" onClick={this.showForm}>Suggest a new project</button>
        <div className="grid-wrapper">
          {columns}
        </div>
        {this.state.show_modal &&
          <Modal active_project={this.state.active_project} submitNewProject={this.submitNewProject} submitEditedProject={this.submitEditedProject} hideModal={this.hideForm} active_project={this.state.active_project} />
        }
      </div>
    );
  }
}

export default App;
