import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/index';

class ToastAlert extends React.Component {
  
  closeTab = () => {
    this.props.actions.closeAlert();
  }

  render() {
    const toastClass = (this.props.alerts.isDisplayed) ? "toast-single error" : "toast-single error display-none";
    const style = (this.props.alerts.data.type == 'error') ? {backgroundColor: '#ef5350'} : {backgroundColor: '#06c38e'};
    return (
      <div className="toast-wrap top-right">
        <div className={toastClass} style={style}>
          <span className="toast-loader"></span>
          <span className="close-toast-single" onClick={this.closeTab}>×</span>
          <div className="toast-icon-wrap">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </div>
          <div className="toast-content-wrap">
            <h2 className="jq-toast-heading">{this.props.alerts.data.type}</h2>
            <p>{this.props.alerts.data.message}</p>
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
)(ToastAlert);

