import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import * as Actions   from '../actions/index';
import { formatDate } from '../lib/utils';

class PollList extends React.Component {
  
  state = {
    sortValue: 'date'
  }
  
  renderPost = () => ({ title, _id, date, options }) => {
    const vote = options.reduce(function(sum, item) {
      return sum + item.vote;
    }, 0);
    
    return (
      <div className="post-preview" key={_id}>
        <Link to={`/polls/${_id}`}>
          <h2 className="post-title">
            {title}
          </h2>
        </Link>
        <p className="post-meta clearfix">
          <span className="float-left vote">
            <i className="fa fa-check-square-o" aria-hidden="true"></i> 
            {"  " + vote}
          </span>
          <span className="float-right">
            {(date) ? formatDate(new Date(date)) : formatDate(new Date())}
          </span>
        </p>
        <hr />
      </div>
    );
  }
  
  handleChange = (event) => {
    event.preventDefault();
    this.setState({sortValue: event.target.value});
    this.props.actions.sortBy({type: event.target.value});
    this.props.actions.fetchPollsPage();
  }
  
  renderList = (polls) => {
    
    if (!polls) {
      return <div>No Poll</div>;
    }
    
    return (
      <div>
        {polls.map((this.renderPost()))}
      </div>
    );
  }
  
  render() {
    return (
      <div className="container main-content"> 
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="clearfix">
              <select className="custom-select float-right" 
                value={this.state.sortValue} onChange={this.handleChange}>
                <option defaultValue="date" disabled>Sort by</option>
                <option value="date">Date</option>
                <option value="vote">Votes</option>
              </select>
            </div>
            {this.renderList(this.props.displayedPolls)}
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
)(PollList);

