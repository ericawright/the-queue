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
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.props.submitProject(e, this.state, `/update_status/${this.props.id}`)}>
          <h2>Edit Project {this.props.title}</h2>
          <label htmlFor="form-title">
            <span>Title of project: </span>
            <input name="title" id="form-title" value={this.state.title} onChange={this.handleChange} />
          </label>
          <label htmlFor="form-name">
            <span>Requester name: </span>
            <input name="name" id="form-name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label htmlFor="form-email">
            <span>Email: </span>
            <input type="email" name="email" id="form-email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label htmlFor="form-content">Description: </label>
          <textarea name="content" id="form-content" value={this.state.content} onChange={this.handleChange} />
          <label htmlFor="form-link">
            <span>Link: </span>
            <input type="url" name="link" id="form-link" value={this.state.link} onChange={this.handleChange} />
          </label>
          <label htmlFor="form-status">
            <span>Status: </span>
            <input name="status" id="form-status" value={this.state.status} onChange={this.handleChange} />
          </label>
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
  submitProject: PropTypes.func,
};

export default EditProjectForm;
