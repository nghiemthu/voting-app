import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/index';
import Chart from './Chart';

class VoteForm extends React.Component {
  
  state = {
    value: '',
    newValue: ''
  }
  
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  
  handleInputChange = (event) => {
    this.setState({newValue: event.target.value});
  }
  
  handleSubmit = (event) => {
    if (!this.state.value) { alert('No selection'); return }
    if (this.state.value !== 'New Option') { 
      alert('Your vote is: ' + this.state.value); 
      this.props.actions.voteOption(this.props.id, this.state.value);
      return; 
    }
    if (!this.state.newValue) { 
      alert('No selection'); 
      return;
    }
    alert('Your vote is: ' + this.state.newValue);
    this.props.actions.voteOption(this.props.id, this.state.newValue);
    event.preventDefault();
  }

  renderOptions = (options) => {
    return (
      <select 
        className="form-control custom-select"
        value={this.state.value} onChange={this.handleChange}
      >
        <option defaultValue='' value='' disabled>Choose an option</option>
        {options.map((option) => {
          return <option key={option._id} value={option.description}>
            {option.description}
          </option>;
        })}
        {(this.props.user.username) ? <option value="New Option">I'd like a custom option</option> : null}
      </select>
    );
  }
  
  renderNewInput = () => {
    if (this.state.value !== 'New Option') return null;
    
    return (
       <div className="form-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Custom Option" 
            value={this.state.newValue}
            onChange={this.handleInputChange} 
          /> 
        </div>
    );
  }
  
  render() {
    return (
      <div className="container main-content"> 
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="form-group">
              <label>I'd like to vote for...:</label>
              {(this.props.options) ? this.renderOptions(this.props.options) : null}
            </div>
            {this.renderNewInput()}
            <div className="clearfix">
              <button 
                type="button" 
                className="btn float-right btn-more" 
                href="#"
                onClick={this.handleSubmit}
              >Submit &rarr;</button>
            </div>
            <Chart />
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
)(VoteForm);



