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
      modal: {type: '', active_project: {}},
    };
    this.showProjects = this.showProjects.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.submitNewProject = this.submitNewProject.bind(this);
    this.submitEditedProject = this.submitEditedProject.bind(this);
    this.inspectProject = this.inspectProject.bind(this);
    this.parseProjectForm = this.parseProjectForm.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.showProjects();
  }

  inspectProject(active_project) {
    this.setState({modal: {type: 'details', active_project}});
  }

  showForm() {
    this.setState({modal: {type: 'new', active_project: {}}});
  }

  hideForm() {
    this.setState({modal: {type: '', active_project: {}}});
  }

  async showProjects() {
    const response = await fetch('/projects');
    let projects = await response.json();

    this.setState({projects});
  }

  parseProjectForm(form_data) {
    for (let key in form_data) {
      if (form_data[key] === '') {
        // Actually delete so that we don't send empty strings or undefined to the database.
        delete form_data[key];
      }
    }
    if (!form_data.title || !form_data.link || !form_data.email) {
      // TODO: show error here
      return;
    }
    return form_data;
  }

  async submitNewProject(form_data) {
    let data = this.parseProjectForm(form_data);
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
    this.showProjects(); // TODO change server to send back project in json, then use the result
    console.log('response,', result);
    this.hideForm();
  }

  async submitEditedProject(id, form_data) {
    let data = this.parseProjectForm(form_data);
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
    this.showProjects(); // TODO change server to send back project in json, then use the result
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
        {this.state.modal.type &&
          <Modal submitNewProject={this.submitNewProject} submitEditedProject={this.submitEditedProject} hideModal={this.hideForm} showModal={this.showForm} {...this.state.modal} />
        }
      </div>
    );
  }
}

export default App;
