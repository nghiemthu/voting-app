import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="heading-content">
                <h1>VotApp</h1>
                <div className="line"></div>
                <span className="subheading">A voting system for you and your friends</span>
                <br/>
                <button type="button" className="btn">New Poll</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

