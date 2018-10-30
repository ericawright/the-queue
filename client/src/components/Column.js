import '../styles/Column.css';
import React, {Component} from 'react';
import Project from './Project';
import PropTypes from 'prop-types';

class Column extends Component {
  render() {
    return (
      <div className={`column ${this.props.is_drop_target? 'drop-target': ''}`} onDragOver={e => this.props.setDropTarget(e, this.props.title)} onDrop={this.props.handleDrop} >
        <h2 className="column-title" id={this.props.title}>{this.props.title}</h2>
        <div>
          {this.props.projects.map((element, i) => <Project key={i} project={element} submitProject={this.props.submitProject} showModal={this.props.showModal} setDragged={this.props.setDragged} />)}
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
  is_drop_target: PropTypes.boolean,
  setDropTarget: PropTypes.func,
  removeDropTarget: PropTypes.func,
  setDragged: PropTypes.func,
  handleDrop: PropTypes.func,
};

export default Column;
