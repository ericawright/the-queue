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
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submitProject = this.submitProject.bind(this);
    this.parseProjectForm = this.parseProjectForm.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.showProjects();
  }

  showModal(type, active_project) {
    this.setState({modal: {type, active_project}});
  }

  hideModal() {
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
    return form_data;
  }

  async submitProject(form_data, address) {
    let data = this.parseProjectForm(form_data);
    if (!data.title || !data.link || !data.email) {
      // TODO: show error here
      return;
    }

    const response = await fetch(address, {
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
    this.hideModal();
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
      columns.push(<Column showModal={this.showModal} submitProject={this.submitProject} projects={projects} title={title} />);
    });

    document.documentElement.style.setProperty('--colCount', columns.length);

    return (
      <div className="App">
        <Header />
        <button id="suggest-button" onClick={this.showModal.bind(null, 'new', {})}>Suggest a new project</button>
        <div className="grid-wrapper">
          {columns}
        </div>
        {this.state.modal.type &&
          <Modal submitProject={this.submitProject} hideModal={this.hideModal} showModal={this.showModal} {...this.state.modal} />
        }
      </div>
    );
  }
}

export default App;
