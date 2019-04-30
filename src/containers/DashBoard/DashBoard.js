import React, { Component } from "react";
import { connect } from "react-redux";
import DebitCard from "../../components/DebitCard/DebitCard";
import Dialog from "@material-ui/core/Dialog";
import Transaction from "../../components/Transaction/Transaction";
import PaymentModal from ".././PaymentModal/PaymentModal";
import "./DashBoard.css";
import { onModalChange, getAuthanticated } from "../.././store/actions/actions";

class DashBoard extends Component {

// get oauth_key and fetch user accounts/transactions data
  componentDidMount() {
    this.props.getAuthanticated();
  }

  render() {
    let balance = this.props.currentAccount.info
      ? this.props.currentAccount.info.balance.amount
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
            ${balance}
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
                onClick={() => this.props.onModalChange("add cash")}
              >
                Add Cash
              </button>
            </div>
            <div className="dashboard-half-container">
              <button
                className="button__blue"
                onClick={() => this.props.onModalChange("cash out")}
              >
                Cash Out
              </button>
            </div>
          </div>
        </div>
        <div>
          <Dialog open={this.props.modalStatus}>
            <PaymentModal
              onCloseModal={this.props.onModalChange}
              balance={balance}
            />
          </Dialog>
        </div>
        <div className="dashboard-transactions-container">
          <h3 className="scdryfont transactions-title">TRANSACTIONS</h3>
          <div className="transactions-divider__bold" />
          <div style={{ marginTop: 40 }}>
            <div className="transactions-subtitle">PAST TRANSACTIONS</div>
            <div>
              {this.props.transactions.map(transaction => {
                return (
                  <Transaction
                    key={transaction._id}
                    type={
                      transaction.from.id === "5cc661ea21730420ee50ee26"
                        ? "Card Withdrawal"
                        : "Cash Deposit"
                    }
                    date="29 April 2019"
                    amount={"$" + transaction.amount.amount}
                    status={transaction.recent_status.status}
                    id={transaction._id}
                    direction={
                      transaction.from.id === "5cc661ea21730420ee50ee26"
                        ? transaction.to.nickname
                        : transaction.from.nickname
                    }
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

const mapStateToProps = state => {
  return {
    modalStatus: state.modalOpen,
    currentAccount: state.currentAccount,
    transactions: state.transactions,
    otherAccounts: state.otherAccounts,
    authKey: state.authKey
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onModalChange: modalType => dispatch(onModalChange(modalType)),
    getAuthanticated: () => dispatch(getAuthanticated())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);
