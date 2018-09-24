import React, { Component } from 'react';
import './Project.css';

class Project extends Component {


  render() {
    return (
      <div>
        <p>title: {this.props.title}</p>
        <p>body: {this.props.body}</p>
      </div>
    );
  }
}

export default Project;