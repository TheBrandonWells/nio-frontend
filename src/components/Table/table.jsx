import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import './styles.scss';

class Table extends Component {

  static get propTypes() {
    return {
      salesList: PropTypes.array,
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { salesList } = this.props;
    return (
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
    );
  }
}

export default Table;
