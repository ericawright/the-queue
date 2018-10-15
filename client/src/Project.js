import './Project.css';
import React, {Component} from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {show_modal: false};

    this.viewProjectDetails = this.viewProjectDetails.bind(this);
    this.hideProjectDetails = this.hideProjectDetails.bind(this);
  }

  viewProjectDetails() {
    this.setState({show_modal: true});
  }

  hideProjectDetails() {
    this.setState({show_modal: false});
  }

  render() {
    return (
      <div>
        <div className="project-card" onClick={this.viewProjectDetails}>
          <p>title: {this.props.title}</p>
          <p>content: {this.props.content}</p>
        </div>
        {this.state.show_modal &&
          <Modal hideModal={this.hideProjectDetails} {...this.props} />
        }
      </div>
    );
  }
}

Project.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.string,
};

export default Project;
