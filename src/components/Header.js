import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/index';


class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  
  handleNewPoll = () => {
    if (!this.props.user.username) {
      this.props.actions.handleError({type: 'error', message: 'You have to be logged in to create new votes'});
      setTimeout(() => this.props.actions.closeAlert(), 2000);  
      return;
    }
    
    this.context.router.history.push('/new');
  }
  
  renderButton = () => {
    if (this.props.button == 'Share') {
      return (
        <Link className="btn btn-link" to='/share'>Share</Link>
      );
    }
    
    if (this.props.button == 'New Poll') {
      return (
        <a className="btn btn-link" onClick={this.handleNewPoll}>New Poll</a>
      );
    }
    
    return null;
  
  }
  
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="heading-content">
                <h1>{this.props.title || 'VotApp'}</h1>
                <div className="line"></div>
                <span className="subheading">{this.props.description || 'Share your thought!'}</span>
                <br/>
                {this.renderButton()}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  // map state to props
  (state) => ({ ...state }),
  // map dispatch to props,
  (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) })
)(Header);


