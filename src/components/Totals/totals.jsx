import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class Totals extends Component {
  static get propTypes() {
    return {
      totalCount: PropTypes.number,
      totalSales: PropTypes.string,
      avgSale: PropTypes.string
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="totalsDash">
        <div>
          <h5>
            Number of Sales:
          </h5>
          <p>
            {this.props.totalCount}
          </p>
        </div>
        <div>
          <h5>
            Total Sales Value:
          </h5>
          <p>
            ${this.props.totalSales}
          </p>
        </div>
        <div>
          <h5>
            Average Sale Value:
          </h5>
          { this.props.totalCount > 1 ?
            <p>
              ${this.props.avgSale}
            </p>
          : null }
        </div>

      </section>
    );
  }
}

export default Totals;
