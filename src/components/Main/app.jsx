import React, { Component } from 'react';
import * as nio from 'niojs';
import uuid from 'uuid';
import _ from 'lodash';

import Totals from '../Totals/totals';
import Charts from '../Charts/charts';


import logo from './logo.png';
import './styles.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      salesList: [],
      chartData: [],
      totalCount: 0,
      totalSales: 0,
      avgSale: 0,
    };
  }

  condenseChartData (chartData) {
    // combine all same type quantities
    const output = _(chartData)
      .groupBy('type')
      .map((v, k) => ({
          type: k,
          quantity: _.sumBy(v, 'quantity')
      })).value();
      // change key names for chart consumption
      Object.keys(output).forEach(function (key) {
          output[key].name = output[key].type;
          output[key].y = output[key].quantity;
      });
      return output;
  }

  componentDidMount() {
    nio.source
      .socketio('//eval.socket.nio.works', ['groceries'], 1)
      .pipe(nio.func(order => {
        const { salesList, totalCount, totalSales, chartData } = this.state;
        order.cart.map((node) => {
          const { type, quantity } = node;
          if (type && quantity) {
            // add our new cart items to the state to pass below to the data format function
            this.setState({
                newchartData: chartData.concat(node)
            })
          }
        });

        this.setState({
            salesList: [ ...salesList, order ],
            chartData: this.condenseChartData(this.state.newchartData),
            totalCount: totalCount + 1,
            totalSales: totalSales + order.amount,
            avgSale: totalSales / totalCount
        })
      }))
  }

  render() {
    const { totalCount, totalSales, avgSale, chartData, salesList } = this.state;

    return (
      <section>
        <header className="appHeader">
          <img src={logo} />
          <h2>
            Frontend Web Exercise
          </h2>
          <p>
            Feel free to send any questions to Brandon@brandonrwells.com
          </p>
        </header>

        <Totals totalCount={totalCount} totalSales={totalSales.toFixed(2)} avgSale={avgSale.toFixed(2)} />

        <Charts chartData={chartData} />

        <section className="mainTableInfo">
          <h5>
            Recent Sales Log:
          </h5>
          <p>
            Here you can find the latest transactions, most recent at the top of the table.
          </p>
        </section>

        <div className="tableContainer">
          <table className="mainTable">
            <tbody>
              <tr>
                <th>
                  Amount
                </th>
                <th>
                  Cart
                </th>
                <th>
                  Customer
                </th>
              </tr>
              {
                salesList.map(function(sale) {
                  return (
                    <tr key={uuid.v4()}>
                      <td>{sale.amount}</td>
                      <td>
                        {
                          sale.cart.map((item, index) => {
                            const { name: itemName, quantity } = item;
                            return <li key={index}>{quantity} {itemName}</li>;
                          })
                        }
                      </td>
                      <td>
                        <p>{sale.shopper.name}</p>
                        <p className="gender">{sale.shopper.gender}</p>
                      </td>
                    </tr>
                  )
                }).reverse()
              }
            </tbody>
          </table>
        </div>

        <footer>
          2017 @ Brandon Wells
        </footer>
      </section>
    );
  }
}

export default App;
