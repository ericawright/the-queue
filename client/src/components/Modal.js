import '../styles/Modal.css';
import React, {Component} from 'react';
import EditProjectForm from './EditProjectForm';
import NewProjectForm from './NewProjectForm';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.showEditProjectForm = this.showEditProjectForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showEditProjectForm() {
    // TODO add a password or otherwise validate here
    this.props.showModal('edit');
  }

  handleClick(e) {
    e.stopPropagation();
    this.props.hideModal();
  }

  render() {
    let modalClass = this.props.type;
    return (
      <div>
        <div id="overlay" onClick={this.handleClick} />
        <div id="modal-base" className={modalClass}>
          {(this.props.type === 'edit' &&
            <div>
              <EditProjectForm {...this.props.active_project} submitEditedProject={this.props.submitEditedProject} />
            </div>) ||
          (this.props.type === 'details' &&
            <div>
              <h2>{this.props.active_project.title}</h2>
              <p>Requester name: {this.props.active_project.name}</p>
              <p>Email: {this.props.active_project.email}</p>
              <p>Description: {this.props.active_project.content}</p>
              <p>Link: {this.props.active_project.link}</p>
              <p>Status: {this.props.active_project.status}</p>
              <button onClick={this.showEditProjectForm}>Edit Project</button>
            </div>) ||
          (this.props.type === 'new' &&
            <NewProjectForm submitNewProject={this.props.submitNewProject} />)
          }
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  submitNewProject: PropTypes.func,
  submitEditedProject: PropTypes.func,
  active_project: PropTypes.object,
  type: PropTypes.string,
};

export default Modal;
