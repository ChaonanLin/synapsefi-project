import React, { Component } from "react";
import "./Transaction.css";

class Transaction extends Component {
  state = {
    open: false,
    receive: this.props.type === "Card Deposit"
  };

  extend = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    let { type, date, amount, status, id, direction } = this.props;
    return (
      <div className="transaction-container" onClick={this.extend}>
        <div className="row">
          <div className="col-3-2">
            <div className="font-transaction-type">{type}</div>
            <div className="font-subinfo">{date}</div>
          </div>
          <div className="col-3-1">
            <div style={{ textAlign: "right" }}>
              <div className="font-amount">{amount}</div>
              <div className="font-subinfo">{status}</div>
            </div>
          </div>
        </div>
        <div className={this.state.open ? "row" : "nondisplay"}>
          <div className="col-3-1">
            <div className="font-subtitle">
              {this.state.receive ? "Transfer From" : "Transfer To"}
            </div>
            <div className="font-darkgrey">{direction}</div>
          </div>
          <div className="col-3-2">
            <div className="font-subtitle">Transaction ID</div>
            <div className="font-darkgrey">{id}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaction;
