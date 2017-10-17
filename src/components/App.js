import React from 'react';
import Header from './Header';

class App extends React.Component {
  state = {
    pageHeader: 'Naming Contests'
  };
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <div>
          Hello there
        </div>
      </div>
    );
  }
}

export default App;

