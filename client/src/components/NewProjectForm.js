import '../styles/NewProjectForm.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NewProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      link: '',
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.props.submitProject(e, this.state, '/projects')}>
          <h2>Submit a New Project</h2>
          <label htmlFor="form-name">
            <span>Requester name: </span>
            <input name="name" id="form-name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label htmlFor="form-email">
            <span>Email: * </span>
            <input type="email" name="email" id="form-email" placeholder="firefox@mozilla.com" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label htmlFor="form-title">
            <span>Title of project: * </span>
            <input name="title" id="form-title" value={this.state.title} onChange={this.handleChange} />
          </label>
          <label htmlFor="form-content">Tell us about the project:</label>
          <textarea name="content" id="form-content" value={this.state.content} onChange={this.handleChange} />
          <label htmlFor="form-link">
            <span>Link to more information: * </span>
            <input type="url" name="link" id="form-link" value={this.state.link} onChange={this.handleChange} />
          </label>
          <p className="form-note">Note: fields with a * are required.</p>
          <button className="submit-button">Submit Request</button>
        </form>
      </div>
    );
  }
}

NewProjectForm.propTypes = {submitProject: PropTypes.func};

export default NewProjectForm;
