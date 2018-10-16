import '../styles/NewProjectForm.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NewProjectForm extends Component {
  constructor(props) {
    super(props);

    this.submitNewProject = this.submitNewProject.bind(this);
  }

  async submitNewProject(e) {
    e.preventDefault();

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
    if (content) {
      data.content = content;
    }
    if (name) {
      data.name = name;
    }

    const response = await fetch('/projects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    // TODO handle error here
    // TODO show new project without refreshing page //this.showProjects();
    console.log('response,', result);
    this.props.hideModal();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitNewProject}>
          <h2>Submit a New Project</h2>
          <label htmlFor="form-name"><span>Requester name: </span><input name="form-name" id="form-name" /></label>
          <label htmlFor="form-email"><span>Email: * </span><input type="email" name="form-email" id="form-email" placeholder="firefox@mozilla.com" /></label>
          <label htmlFor="form-title"><span>Title of project: * </span><input name="form-title" id="form-title" /></label>
          <label htmlFor="form-content">Tell us about the project:</label>
          <textarea name="form-content" id="form-content" />
          <label htmlFor="form-link"><span>Link to more information: * </span><input type="url" name="form-link" id="form-link" /></label>
          <p className="form-note">Note: fields with a * are required.</p>
          <button className="submit-button">Submit Request</button>
        </form>
      </div>
    );
  }
}

NewProjectForm.propTypes = {hideModal: PropTypes.func};

export default NewProjectForm;
