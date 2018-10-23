import '../styles/Project.css';
import React, {Component} from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';

class Project extends Component {
  constructor(props) {
    super(props);

    this.inspectProject = this.inspectProject.bind(this);
  }

  inspectProject() {
    this.props.inspectProject(this.props.project);
  }

  render() {
    return (
      <div>
        <div className="project-card" onClick={this.inspectProject}>
          <h2>{this.props.project.title}</h2>
          <p className="project-card-content">{this.props.project.content}</p>
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  project: PropTypes.object,
  inspectProject: PropTypes.func,
};

export default Project;
