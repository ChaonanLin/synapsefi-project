import React, { Component } from "react";
import DebitCard from "../../components/DebitCard/DebitCard";
import Dialog from "@material-ui/core/Dialog";
import Transaction from "../../components/Transaction/Transaction";
import PaymentModal from ".././PaymentModal/PaymentModal";
import axios from "axios";
import "./DashBoard.css";

class DashBoard extends Component {
  state = {
    modalOpen: false,
    modalType: "",
    currentAccount: {},
    nodes: [],
    transactions: []
  };

  onModalChange = value => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      modalType: value
    }));
  };

  componentDidMount() {
    let headers = {
      "X-SP-GATEWAY":
        "client_id_gcvWhR0VjZiawAr8JU6LpkN2bKtx5OmzulyFBM70|client_secret_3xDY0cMElJmeq7r6ZfIsPj2gBLTUOSyG1dnpt8VA",
      "X-SP-USER-IP": "73.241.31.11",
      "X-SP-USER": "oauth_IiOtyoju0mn59JCH2QELd4BWfKPSGhV8YzDbZM0U|",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };

    //get current account info
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes/5cc661ea21730420ee50ee26`,
        {
          headers: headers
        }
      )
      .then(res => {
        this.setState({ currentAccount: res.data });
      })
      .catch(res => {
        console.log("failed", res);
      });

    //get all other accounts
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes`,
        {
          headers: headers
        }
      )
      .then(res => {
        console.log(res.data.nodes);
        //filter out the current account
        let otherAccount = res.data.nodes.filter(node => node._id !== "5cc661ea21730420ee50ee26")
        this.setState({ nodes: otherAccount });
      })
      .catch(res => {
        console.log("failed", res);
      });

    //get all transactions data of test saving account
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes/5cc661ea21730420ee50ee26/trans`,
        {
          headers: headers
        }
      )
      .then(res => {
        console.log(res.data.trans);
        this.setState({ transactions: res.data.trans });
      })
      .catch(res => {
        console.log("failed", res);
      });
  }

  render() {
    let amount =
      this.state.currentAccount.info
        ? this.state.currentAccount.info.balance.amount
        : "loading";

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
            ${amount}
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
              <button
                className="button__blue"
                onClick={() => this.onModalChange("add cash")}
              >
                Add Cash
              </button>
            </div>
            <div className="dashboard-half-container">
              <button
                className="button__blue"
                onClick={() => this.onModalChange("cash out")}
              >
                Cash Out
              </button>
            </div>
          </div>
        </div>
        <div>
          <Dialog open={this.state.modalOpen}>
            <PaymentModal
              onCloseModal={this.onModalChange}
              type={this.state.modalType}
              accounts={this.state.nodes}
              balance={amount}
            />
          </Dialog>
        </div>
        <div className="dashboard-transactions-container">
          <h3 className="scdryfont transactions-title">TRANSACTIONS</h3>
          <div className="transactions-divider__bold" />
          <div style={{ marginTop: 40 }}>
            <div className="transactions-subtitle">PAST TRANSACTIONS</div>
            <div>
              {this.state.transactions.map(transaction => {
                return (
                  <Transaction
                    key={transaction._id}
                    type={transaction.from.id === "5cc661ea21730420ee50ee26" ? "Card Withdrawal" : "Cash Deposit"}
                    date="29 April 2019"
                    amount={"$" + transaction.amount.amount}
                    status={transaction.recent_status.status}
                    id={transaction._id}
                    direction={transaction.from.id === "5cc661ea21730420ee50ee26" ? transaction.to.nickname : transaction.from.nickname }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
