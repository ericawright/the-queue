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
      show_form: false,
    };
    this.showProjects = this.showProjects.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.showProjects();
  }

  showForm() {
    this.setState({show_form: true});
  }

  hideForm() {
    this.setState({show_form: false});
  }

  async showProjects() {
    const response = await fetch('/projects');
    let projects = await response.json();

    this.setState({projects});
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
      columns.push(<Column projects={projects} title={title} />);
    });

    document.documentElement.style.setProperty('--colCount', columns.length);

    return (
      <div className="App">
        <Header />
        <button id="suggest-button" onClick={this.showForm}>Suggest a new project</button>
        <div className="grid-wrapper">
          {columns}
        </div>
        {this.state.show_form &&
          <Modal hideModal={this.hideForm} />
        }
      </div>
    );
  }
}

export default App;
