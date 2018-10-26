import '../styles/Column.css';
import React, {Component} from 'react';
import Project from './Project';
import PropTypes from 'prop-types';

class Column extends Component {
  render() {
    return (
      <div>
        <h2 className="column-title" id={this.props.title}>{this.props.title}</h2>
        <div>
          {this.props.projects.map((element, i) => <Project key={i} project={element} submitProject={this.props.submitProject} showModal={this.props.showModal} />)}
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  projects: PropTypes.array,
  title: PropTypes.string,
  submitProject: PropTypes.func,
  showModal: PropTypes.func,
};

export default Column;