// import '../styles/NewProjectForm.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      content: props.content,
      link: props.link,
      name: props.name,
      email: props.email,
      status: props.status,
    }

    this.submitEditedProject = this.submitEditedProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async submitEditedProject(e) {
    e.preventDefault();
    console.log('form submission');

    let title = e.target.querySelector('#form-title').value;
    let email = e.target.querySelector('#form-email').value;
    let link = e.target.querySelector('#form-link').value;
    if (!title || !link || !email) {
      // TODO: show error here
      return;
    }
    let data = {
      title,
      link,
      email,
    };
    let content = e.target.querySelector('#form-content').value;
    let name = e.target.querySelector('#form-name').value;
    let status = e.target.querySelector('#form-status').value;
    if (content) {
      data.content = content;
    }
    if (name) {
      data.name = name;
    }
    if (status) {
      data.status = status;
    }

    const response = await fetch(`/update_status/${this.props.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    // TODO handle error here
    // TODO show changes without refreshing page //this.showProjects();
    console.log('response,', result);
    this.props.hideModal();
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitEditedProject}>
          <h2>Edit Project {this.props.title}</h2>
          <label htmlFor="form-title"><span>Title of project: * </span><input name="title" id="form-title" value={this.state.title} onChange={this.handleChange} /></label>
          <label htmlFor="form-name"><span>Requester name: </span><input name="name" id="form-name" value={this.state.name} onChange={this.handleChange} /></label>
          <label htmlFor="form-email"><span>Email: * </span><input type="email" name="email" id="form-email" value={this.state.email} onChange={this.handleChange} /></label>
          <label htmlFor="form-content">Description: </label>
          <textarea name="content" id="form-content" value={this.state.content} onChange={this.handleChange} />
          <label htmlFor="form-link"><span>Link: * </span><input type="url" name="link" id="form-link" value={this.state.link} onChange={this.handleChange} /></label>
          <label htmlFor="form-status"><span>Status: * </span><input name="status" id="form-status" value={this.state.status} onChange={this.handleChange} /></label>
          <button className="submit-button">Submit Request</button>
        </form>
      </div>
    );
  }
}

EditProjectForm.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.string,
  hideModal: PropTypes.func,
};

export default EditProjectForm;
