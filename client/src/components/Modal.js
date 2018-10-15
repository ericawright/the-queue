import '../styles/Modal.css';
import React, {Component} from 'react';
import NewProjectForm from './NewProjectForm';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {edit_project_form: false};

    this.showEditProjectForm = this.showEditProjectForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.editProject = this.editProject.bind(this);
  }

  showEditProjectForm() {
    // TODO add a password or otherwise validate here
    this.setState({edit_project_form: true});
  }

  handleClick(e) {
    e.stopPropagation();
    this.props.hideModal();
  }

  editProject(e) {
    e.preventDefault();
    console.log('project edited');
    // TODO
  }

  render() {
    return (
      <div>
        <div id="overlay" onClick={this.handleClick} />
        <div id="modal-base">
          {(this.state.edit_project_form &&
            <div>
              <form onSubmit={this.editProject}>
                <h2>Edit Project {this.props.title}</h2>
                <label htmlFor="form-title"><span>Title of project: * </span><input name="form-title" id="form-title" value={this.props.title} /></label>
                <label htmlFor="form-name"><span>Requester name: </span><input name="form-name" id="form-name" value={this.props.name} /></label>
                <label htmlFor="form-email"><span>Email: * </span><input type="email" name="form-email" id="form-email" value={this.props.email} /></label>
                <label htmlFor="form-content">Description: </label>
                <textarea name="form-content" id="form-content" value={this.props.content} />
                <label htmlFor="form-link"><span>Link: * </span><input type="url" name="form-link" id="form-link" value={this.props.link} /></label>
                <label htmlFor="form-status"><span>Status: * </span><input name="form-status" id="form-status" value={this.props.status} /></label>
                <button className="submit-button">Submit Request</button>
              </form>
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
  title: PropTypes.string,
  content: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.string,
  hideModal: PropTypes.func,
};

export default Modal;
