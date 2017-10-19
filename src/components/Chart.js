import React from 'react';
import {Pie} from 'react-chartjs-2';


class Chart extends React.Component {
  state = {
    value: {
      datasets: [{
        data: [1, 2, 3],
        backgroundColor: [ 
          '#FF5948', 
          '#FFC648', 
          '#3AADC3'
        ]
      }],
      labels: [
        'Red',
        'Yellow',
        'Blue'
      ]
    }
  }
  
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Pie Chart</h4>
          <div>
          <Pie
            data={this.state.value}
            options={
              {
                legend: {
                  display: true,
                  labels: {
                    fontColor: "#333",
                    boxWidth: 20
                },
                  position: 'bottom'
                }
              }
            }
          />
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;

