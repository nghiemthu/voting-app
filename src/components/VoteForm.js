import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';

class VoteForm extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    value: '',
    newValue: '',
    newValueValidation: ''
  }
  
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  
  handleInputChange = (event) => {
    this.setState({
      newValue: event.target.value
    });
  }
  
  handleSubmit = (event) => {
    const chosenOption = this.props.options.filter((option) => option._id == this.state.value);
    const { value, newValue } = this.state;
    const id = this.props.polls.currentPoll._id;
    
    if (!value) { this.props.actions.handleError({type: 'error', message: 'You have to select a option first!'}); return }
    if (value !== 'New Option') { 
      this.props.actions.voteOption(id, value, chosenOption[0].description);
      return; 
    }
    if (!newValue) { 
      this.setState({newValueValidation: 'New value required'});
      return;
    } else {
      this.setState({newValueValidation: ''});
    }

    this.props.actions.voteOption(id, 'newValue', newValue);
    this.props.actions.fetchPoll(id);
    event.preventDefault();
  }

  renderOptions = () => {
    return (
      <select 
        className="form-control custom-select"
        value={this.state.value} onChange={this.handleChange}
      >
        <option defaultValue='' value='' disabled>Choose an option</option>
        {this.props.options.map((option) => {
          return <option key={option._id} value={option._id}>
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
            className={(this.state.newValueValidation) ? 'form-control input-danger' : 'form-control'}
            placeholder="Custom Option" 
            value={this.state.newValue}
            onChange={this.handleInputChange} 
          /> 
          <span className='danger'>{this.state.newValueValidation}</span>
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
              {(this.props.options) ? this.renderOptions() : null}
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



