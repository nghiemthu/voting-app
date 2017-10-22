import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/index';

class PageButtons extends React.Component {
  
  
  handleNextPage = () => {
    event.preventDefault();
    this.props.actions.getNextPage();
    this.props.actions.fetchPollsPage();
  }
  
  handlePreviousPage = () => {
    event.preventDefault();
    this.props.actions.getPreviousPage();
    this.props.actions.fetchPollsPage();
  }
  
  
  renderLeftButton = () => {
    if (this.props.polls.page <= 0)
      return;
    
    return (
      <button type="button" className="btn float-left btn-more" href="#"
        onClick={this.handlePreviousPage}
      >Previous</button>
    );
  }
  
  renderRightButton = () => {
    if (this.props.polls.page >= this.props.polls.maxPage-1)
      return;
  
    return (
      <button type="button" className="btn float-right btn-more" href="#"
        onClick={this.handleNextPage}
      >More</button>
    );
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="clearfix">
              {this.renderLeftButton()}
              {this.renderRightButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  // map state to props
  (state) => ({ ...state }),
  // map dispatch to props,
  (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) })
)(PageButtons);


