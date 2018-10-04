import React, { Component } from 'react';
import './Project.css';

class Project extends Component {

  render() {
    return (
      <div className='project-card'>
        <p>title: {this.props.title}</p>
        <p>content: {this.props.content}</p>
      </div>
    );
  }
}

export default Project;