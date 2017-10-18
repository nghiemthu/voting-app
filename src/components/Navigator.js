import React from 'react';

class Navigator extends React.Component {
  
  renderLogin = () => {
    if (this.props.user.username) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">My Polls</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/logout">{this.props.user.username} <i className="fa fa-sign-out"></i></a>
          </li>
        </ul>  
      );
    }
    
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/auth/twitter">Sign In</a>
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
          <a className="navbar-brand" href="#"><i className="fa fa-check-square-o" aria-hidden="true"></i> VotApp</a>
      
          <div className="navbar-collapse collapse" id="navbarContainer" aria-expanded="false">
            {this.renderLogin()}
          </div>
        </div>
      </div>
    );
  }
}

export default Navigator;

