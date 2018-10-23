import '../styles/Project.css';
import React, {Component} from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {show_modal: false};

    this.viewProjectDetails = this.viewProjectDetails.bind(this);
    this.hideProjectDetails = this.hideProjectDetails.bind(this);
  }

  viewProjectDetails() {
    this.setState({show_modal: true});
  }

  hideProjectDetails() {
    this.setState({show_modal: false});
  }

  render() {
    return (
      <div>
        <div className="project-card" onClick={this.viewProjectDetails}>
          <h2>{this.props.project.title}</h2>
          <p className="project-card-content">{this.props.project.content}</p>
        </div>
        {this.state.show_modal &&
          <Modal hideModal={this.hideProjectDetails} {...this.props.project} />
        }
      </div>
    );
  }
}

Project.propTypes = {project: PropTypes.object};

export default Project;
