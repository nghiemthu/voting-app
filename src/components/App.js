import React, { PropTypes } from 'react';
import Header from './Header';
import Navigator from './Navigator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';

class App extends React.Component {
  
  componentDidMount = () => {
    this.props.actions.fetchPolls();
  }
  
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Navigator />
        <Header />
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(
  // map state to props
  (state) => ({ ...state }),
  // map dispatch to props,
  (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) })
)(App);


