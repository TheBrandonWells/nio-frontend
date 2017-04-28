import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'react-highcharts';

import './styles.scss';

class ChartDashboard extends Component {

  static get propTypes() {
    return {
      chartData: PropTypes.array,
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    const config = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Orders by Type',
      },
      plotOptions: {
        pie: {
          shadow: false
        }
      },
      tooltip: {
        formatter: function() {
          return '<b>' + this.point.name + '</b>: ' + this.y + '';
        }
      },
      series: [{
        name: 'Orders',
        data: this.props.chartData,
        size: '100%',
        innerSize: '85%',
        showInLegend: true,
        dataLabels: {
          enabled: true
        }
      }]
    }
    return (
      <section className="chartsDash">
        <Highcharts config={config}/>
      </section>
    );
  }
}

export default ChartDashboard;
