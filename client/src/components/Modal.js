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
    return (
      <div>
        <div id="overlay" onClick={this.handleClick} />
        <div id="modal-base">
          {(this.state.edit_project_form &&
            <div>
              <EditProjectForm {...this.props} />
            </div>) ||
          (this.props.title &&
            <div>
              <h2>{this.props.title}</h2>
              <p>Requester name: {this.props.name}</p>
              <p>Email: {this.props.email}</p>
              <p>Description: {this.props.content}</p>
              <p>Link: {this.props.link}</p>
              <p>Status: {this.props.status}</p>
              <button onClick={this.showEditProjectForm}>Edit Project</button>
            </div>) ||
            <NewProjectForm hideModal={this.props.hideModal} />
          }
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.string,
  hideModal: PropTypes.func,
};

export default Modal;
