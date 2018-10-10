import './Project.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Project extends Component {
  render() {
    return (
      <div className="project-card">
        <p>title: {this.props.title}</p>
        <p>content: {this.props.content}</p>
      </div>
    );
  }
}

Project.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default Project;
