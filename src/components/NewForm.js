import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/index';

class NewForm extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  
  state = {
    title: '',
    options: '',
    titleValidation: '',
    optionsValidation: ''
  }
  
  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }
  
  handleOptionsChange = (event) => {
    this.setState({options: event.target.value});
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    
    if (!this.state.title) {
      this.setState({titleValidation: 'Title is empty'});
    } else {
      this.setState({titleValidation: ''});
    }
    
    if (this.state.options.split(', ').length <= 1) {
      this.setState({optionsValidation: 'A poll needs 2 options'});
    } else {
      this.setState({optionsValidation: ''});
    }
    
    if (!this.state.title || this.state.options.split(', ').length <= 1)
      return;
    
    this.props.actions.postNewPoll(this.state.title, this.state.options);
    this.context.router.history.push('/pollview');
  }
  
  render() {
    return (
      <div className="container main-content"> 
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="form-group">
              <label>Title:</label>
                <input 
                  type="text" 
                  className={(this.state.titleValidation) ? 'form-control input-danger' : 'form-control'}
                  placeholder="New Title" 
                  value={this.state.title}
                  onChange={this.handleTitleChange} 
                /> 
              <span className='danger'>{this.state.titleValidation}</span>
            </div>
            <div className="form-group">
              <label>Option:</label>
                <textarea 
                  type="text" 
                  className={(this.state.optionsValidation) ? 'form-control input-danger' : 'form-control'}
                  placeholder="Option (seperated by , )" 
                  value={this.state.options}
                  onChange={this.handleOptionsChange} 
                  rows="5"
                />
              <span className='danger'>{this.state.optionsValidation}</span>
            </div>
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
)(NewForm);



