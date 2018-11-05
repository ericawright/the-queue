import '../styles/Modal.css';
import React, {Component} from 'react';
import EditProjectForm from './EditProjectForm';
import NewProjectForm from './NewProjectForm';
import PropTypes from 'prop-types';

class Modal extends Component {
  render() {
    let modalClass = this.props.type;
    return (
      <div>
        <div id="overlay" onClick={e => this.props.hideModal(e)} />
        <div id="modal-base" className={modalClass}>
          {(this.props.type === 'edit' &&
            <div>
              <EditProjectForm {...this.props.active_project} submitProject={this.props.submitProject} />
            </div>) ||
          (this.props.type === 'details' &&
            <div>
              <h2>{this.props.active_project.title}</h2>
              <p>Requester name: {this.props.active_project.name}</p>
              <p>Email: {this.props.active_project.email}</p>
              <p>Description: {this.props.active_project.content}</p>
              <p>Link: {this.props.active_project.link}</p>
              <p>Status: {this.props.active_project.status}</p>
              <button onClick={() => this.props.showModal('edit', this.props.active_project)}>Edit Project</button>
            </div>) ||
          (this.props.type === 'new' &&
            <NewProjectForm submitProject={this.props.submitProject} />)
          }
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  submitProject: PropTypes.func,
  active_project: PropTypes.object,
  type: PropTypes.string,
};

export default Modal;
