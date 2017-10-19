import React from 'react';
import { Link } from 'react-router-dom';

class Navigator extends React.Component {
  
  renderLogin = () => {
    if (this.props.user.username) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to='/'>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/header'>My Polls</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/logout">{this.props.user.username} 
            <i className="fa fa-sign-out"></i></a>
          </li>
        </ul>  
      );
    }
    
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-link" to='/'>Home</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/auth/twitter">Sign In
          <i className="fa fa-sign-in"></i></a>
        </li>
      </ul>  
    );
    
  }
  
  render = () => {
    return (
      <div className="navbar navbar-inverse bg-inverse navbar-toggleable-md" id="mainNav">
        <div className="container">
          <button className="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarContainer" aria-controls="navbarsExampleContainer" aria-expanded="false" aria-label="Toggle navigation">
            Home 
            <i className="fa fa-bars"></i>
          </button>
          <Link className="navbar-brand" to='/'><i className="fa fa-check-square-o" aria-hidden="true"></i> VotApp</Link>
          <div className="navbar-collapse collapse" id="navbarContainer" aria-expanded="false">
            {this.renderLogin()}
          </div>
        </div>
      </div>
    );
  }
}

export default Navigator;

