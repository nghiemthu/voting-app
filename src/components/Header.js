import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="heading-content">
                <h1>{this.props.title || 'VotApp'}</h1>
                <div className="line"></div>
                <span className="subheading">{this.props.description || 'Share your thought!'}</span>
                <br/>
                <button type="button" className="btn">{this.props.button || 'New Poll'}</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

