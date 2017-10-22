import React from 'react';
import {Pie} from 'react-chartjs-2';

import { getRandomColor } from '../lib/utils';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/index';

class Chart extends React.Component {
  render() {
    const options = this.props.polls.currentPoll.options || [];
    
    const data = {
      datasets: [{
        data: options.map((option) => option.vote),
        backgroundColor: options.map((option) => getRandomColor())
      }],
      labels: options.map((option) => option.description)
    };
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Pie Chart</h4>
                <div>
                <Pie
                  data={data}
                  options={
                    {
                      legend: {
                        display: true,
                        labels: {
                          fontColor: "#333",
                          boxWidth: 20,
                          fontFamily: "'Montserrat', sans-serif"
                      },
                        position: 'bottom'
                      }
                    }
                  }
                />
                </div>
              </div>
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
)(Chart);