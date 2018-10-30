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
      drop_target: null,
      dragged_project_id: null,
    };
    this.showProjects = this.showProjects.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submitProject = this.submitProject.bind(this);
    this.parseProjectForm = this.parseProjectForm.bind(this);
    this.setDropTarget = this.setDropTarget.bind(this);
    this.removeDropTarget = this.removeDropTarget.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.setDragged = this.setDragged.bind(this);
    this.removeDragged = this.removeDragged.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.showProjects();
  }

  showModal(type, active_project) {
    this.setState({modal: {type, active_project}});
  }

  hideModal(e) {
    if (e) {
      e.stopPropagation();
    }
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

  async submitProject(e, form_data, address) {
    e.preventDefault();
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

  setDropTarget(e, drop_target) {
    e.preventDefault();
    this.setState({drop_target});
  }

  removeDropTarget(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({drop_target: null});
  }

  async handleDrop(e) {
    e.preventDefault();
    const data = {status: this.state.drop_target};

    const response = fetch(`/update_status/${this.state.dragged_project_id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    await response;
    // TODO change server to send back project/change in json, then use the result
    this.showProjects();
    this.removeDropTarget();
  }

  setDragged(dragged_project_id) {
    this.setState({dragged_project_id});
  }

  removeDragged() {
    this.setState({dragged_project_id: null});
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
      columns.push(<Column setDropTarget={this.setDropTarget} removeDropTarget={this.removeDropTarget} is_drop_target={this.state.drop_target === title} handleDrop={this.handleDrop} setDragged={this.setDragged} showModal={this.showModal} submitProject={this.submitProject} projects={projects} title={title} />);
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
