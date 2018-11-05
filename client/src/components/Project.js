import '../styles/Project.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Project extends Component {
  constructor(props) {
    super(props);

    this.inspectProject = this.inspectProject.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }

  inspectProject() {
    this.props.showModal('details', this.props.project);
  }

  dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
    this.props.setDragged(this.props.project.id);
  }

  render() {
    return (
      <div>
        <div className="project-card" onClick={this.inspectProject} draggable="true" onDragStart={this.dragStart}>
          <h2>{this.props.project.title}</h2>
          <p className="project-card-content">{this.props.project.content}</p>
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  project: PropTypes.object,
  showModal: PropTypes.func,
  setDragged: PropTypes.func,
};

export default Project;
