import '../styles/NewProjectForm.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NewProjectForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.submitNewProject}>
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

NewProjectForm.propTypes = {
  submitNewProject: PropTypes.func,
};

export default NewProjectForm;
