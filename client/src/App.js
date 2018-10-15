import './App.css';
import React, {Component} from 'react';
import Header from './Header';
import Modal from './Modal';
import Project from './Project';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_projects: [],
      in_progress_projects: [],
      done_projects: [],
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
    let new_projects = projects.filter(project => project.status === 'new');
    let in_progress_projects = projects.filter(project => project.status === 'in-progress');
    let done_projects = projects.filter(project => project.status === 'done');

    this.setState({new_projects, in_progress_projects, done_projects});
  }

  async updateStatus() {
    console.log('update status was clicked');
    const response = await fetch('/update_status', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="grid-wrapper">

          {/* Column 1 */}
          <h2 className="column-title" id="submitted">Submitted</h2>
          <button id="suggest-button" onClick={this.showForm}>Suggest a new project</button>
          <div id="project-collection-col-one">
            {this.state.new_projects.map((element, i) => <Project key={element+i} {...element} />)}
          </div>

          {/* Column 2 */}
          <h2 className="column-title" id="in-progress">In Progress</h2>
          <div id="project-collection-col-two">
            {this.state.in_progress_projects.map((element, i) => <Project key={element+i} {...element} />)}
          </div>

          {/* Column 3 */}
          <h2 className="column-title" id="done">Done</h2>
          <div id="project-collection-col-three">
            {this.state.done_projects.map((element, i) => <Project key={element+i} {...element} />)}
          </div>

        </div>
        {this.state.show_form &&
          <Modal hideModal={this.hideForm} />
        }
      </div>
    );
  }
}

export default App;
