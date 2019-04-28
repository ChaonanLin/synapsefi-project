import React, { Component } from "react";
import DebitCard from "../../components/DebitCard/DebitCard";
import Modal from "@material-ui/core/Modal";
import Transaction from "../../components/Transaction/Transaction";
import PaymentModal from "../../components/PaymentModal/PaymentModal";

import "./DashBoard.css";

class DashBoard extends Component {
  state = {
    modalOpen: false
  };

  onModalChange = () => {
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));
  };

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-half-container">
          <DebitCard />
        </div>
        <div className="dashboard-half-container">
          <h3>CURRENT BALANCE</h3>
          <h1
            style={{ fontSize: 55, fontWeight: 400, letterSpacing: 3 }}
            className="scdryfont"
          >
            $345,432.62
          </h1>
          <div className="dashboard-card-tools">
            <div className="dashboard-half-container">
              <div style={{ padding: "5px 0px" }}>
                <span className="dashboard-card-status-dot__green" />
                <span className="dashboard-card-status-text">CARD ACTIVE</span>
              </div>
            </div>
            <div className="dashboard-half-container">
              <div style={{ position: "relative", display: "flex" }}>
                <div>
                  <button className="button__yellow">Lock Card</button>
                </div>
                <button className="card-setting">
                  <i className="fas fa-cog" />
                </button>
              </div>
            </div>
            <div className="dashboard-half-container">
              <button className="button__blue" onClick={this.onModalChange}>
                Add Cash
              </button>
            </div>
            <div className="dashboard-half-container">
              <button className="button__blue">Cash Out</button>
            </div>
          </div>
        </div>
        <div>
          <Modal open={this.state.modalOpen}>
            <PaymentModal onCloseModal={this.onModalChange} />
          </Modal>
        </div>
        <div className="dashboard-transactions-container">
          <h3 className="scdryfont transactions-title">TRANSACTIONS</h3>
          <div className="transactions-divider__bold" />
          <div style={{ marginTop: 40 }}>
            <div className="transactions-subtitle">PAST TRANSACTIONS</div>
            <div>
              <Transaction
                type="Card Withdrawal"
                date="26 Apr 2019"
                amount="+$90.09"
                status="PENDING"
                id="5cc3640d03d45400cb9a4c24"
                direction="My Checking"
              />
              <Transaction
                type="Card Withdrawal"
                date="26 Apr 2019"
                amount="+$90.09"
                status="PENDING"
                id="5cc3640d03d45400cb9a4c24"
                direction="My Checking"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
