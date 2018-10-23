import '../styles/Modal.css';
import React, {Component} from 'react';
import EditProjectForm from './EditProjectForm';
import NewProjectForm from './NewProjectForm';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {edit_project_form: false};

    this.showEditProjectForm = this.showEditProjectForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showEditProjectForm() {
    // TODO add a password or otherwise validate here
    this.setState({edit_project_form: true});
  }

  handleClick(e) {
    e.stopPropagation();
    this.props.hideModal();
  }

  render() {
    let existing_project = Object.keys(this.props.active_project).length;
    let modalClass = this.state.edit_project_form? 'edit' : '';
    return (
      <div>
        <div id="overlay" onClick={this.handleClick} />
        <div id="modal-base" className={modalClass}>
          {(this.state.edit_project_form &&
            <div>
              <EditProjectForm {...this.props.active_project} submitEditedProject={this.props.submitEditedProject}/>
            </div>) ||
          (existing_project &&
            <div>
              <h2>{this.props.active_project.title}</h2>
              <p>Requester name: {this.props.active_project.name}</p>
              <p>Email: {this.props.active_project.email}</p>
              <p>Description: {this.props.active_project.content}</p>
              <p>Link: {this.props.active_project.link}</p>
              <p>Status: {this.props.active_project.status}</p>
              <button onClick={this.showEditProjectForm}>Edit Project</button>
            </div>) ||
            <NewProjectForm submitNewProject={this.props.submitProjectForm} />
          }
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  hideModal: PropTypes.func,
  submitProjectForm: PropTypes.func,
  submitEditedProject: PropTypes.func,
  active_project: PropTypes.object,
};

export default Modal;
