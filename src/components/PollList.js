import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '../lib/utils';

class PollList extends React.Component {
  
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
  
  renderList = (polls) => {
    
    if (!polls) {
      return <div>No Poll</div>;
    }
    
    return (
      <div>
        {polls.map((this.renderPost()))}
        <div className="clearfix">
          <button type="button" className="btn float-right btn-more" href="#">More Polls &rarr;</button>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <div className="container main-content"> 
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="clearfix">
              <select className="custom-select float-right">
                <option defaultValue="1">Sort by</option>
                <option value="1">Date</option>
                <option value="2">Votes</option>
              </select>
            </div>
            {this.renderList(this.props.polls)}
          </div>
        </div>
      </div>
    );
  }
}

export default PollList;
