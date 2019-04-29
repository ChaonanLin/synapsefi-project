import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "../../components/Dropdown/Dropdown.js";
import CurrencyInput from "react-currency-input";
import "./PaymentModal.css";
import axios from "axios";

class PaymentModal extends Component {
  state = {
    bankAcounts: this.props.accounts,
    selectedAccount: this.props.accounts[0]
  };

  changeAccount = item => {
    this.setState({ selectedAccount: item });
    this.props.changeDropdown();
  };

  CashOut = () => {
    let headers = {
      "X-SP-GATEWAY":
        "client_id_gcvWhR0VjZiawAr8JU6LpkN2bKtx5OmzulyFBM70|client_secret_3xDY0cMElJmeq7r6ZfIsPj2gBLTUOSyG1dnpt8VA",
      "X-SP-USER-IP": "73.241.31.11",
      "X-SP-USER": "oauth_A9u0w8NIkC7sB2v3WFRnpjJcSL0tPEh1mUDQrfgG|",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };

    let data = {
      to: {
        type: this.state.selectedAccount.type,
        id: this.state.selectedAccount._id
      },
      amount: {
        amount: parseFloat(this.props.amount.slice(1)),
        currency: "USD"
      },
      extra: {
        ip: "192.168.0.1"
      }
    };

    axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes/5cc661ea21730420ee50ee26/trans`,
        data,
        {
          headers: headers
        }
      )
      .then(res => {
        console.log("transaction made");
        this.props.onModalChange();
        window.location.reload();
      })
      .catch(res => {
        alert(
          "Oh no,something happened and the transaction has not been made. Please try later."
        );
        console.log("failed", res);
      });
  };

  AddCash = () => {
    let headers = {
      "X-SP-GATEWAY":
        "client_id_gcvWhR0VjZiawAr8JU6LpkN2bKtx5OmzulyFBM70|client_secret_3xDY0cMElJmeq7r6ZfIsPj2gBLTUOSyG1dnpt8VA",
      "X-SP-USER-IP": "73.241.31.11",
      "X-SP-USER": "oauth_XweunAT2HLKhxdkstyvlPRYq64FZ3SBoGrmOVb0U|",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };

    let data = {
      to: {
        type: "ACH-US",
        id: "5cc661ea21730420ee50ee26"
      },
      amount: {
        amount: parseFloat(this.props.amount.slice(1)),
        currency: "USD"
      },
      extra: {
        ip: "192.168.0.1"
      }
    };

    let url =
      "https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes/" +
      this.state.selectedAccount._id +
      "/trans";

    axios
      .post(url, data, {
        headers: headers
      })
      .then(res => {
        console.log("transaction made");
        this.props.onModalChange();
        window.location.reload();
      })
      .catch(res => {
        alert(
          "Oh no,something happened and the transaction has not been made. Please try later."
        );
        console.log("failed", res);
      });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.props.type === "add cash") {
      this.AddCash();
    }
    if (this.props.type === "cash out") {
      this.CashOut();
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="payment-container">
          <div className="payment-close" onClick={this.props.onModalChange}>
            <i className="fas fa-times" />
          </div>
          <div className="payment-title">
            {this.props.type === "add cash" ? "ADD CASH" : "CASH OUT"}
          </div>
          <div className="payment-divider" />
          <div className="payment-description">
            You have ${this.props.balance} available in cash. How much would you
            like to add cash to your CARD-US account?
          </div>
          <div className="payment-input-container">
            <CurrencyInput
              prefix="$"
              className="payment-input"
              id="payment-input"
              value={this.props.amount}
              onChangeEvent={this.props.changeAmount}
            />
          </div>
          <div className="payment-account-dropdown">
            <Dropdown
              items={this.state.bankAcounts}
              selectedAccount={this.state.selectedAccount}
              showItems={this.props.showDropdownItems}
              onAccountChange={this.changeAccount}
              onDropdownChange={this.props.changeDropdown}
            />
          </div>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <input
              type="submit"
              value={this.props.type === "add cash" ? "Add Cash" : "Cash Out"}
              className="payment-button"
              name={this.props.type === "add cash" ? "Add Cash" : "Cash Out"}
              id={this.props.type === "add cash" ? "Add Cash" : "Cash Out"}
            />
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    amount: state.transactionAmount,
    showDropdownItems: state.showDropdownItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onModalChange: modalType =>
      dispatch({ type: "ON_MODALCHANGE", modalType: modalType }),
    changeAmount: (event, maskedvalue, floatvalue) =>
      dispatch({
        type: "CHANGE_TRANSAMOUNT",
        playload: { event, maskedvalue, floatvalue }
      }),
    changeDropdown: () => dispatch({ type: "CHANGE_DROPDOWN" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentModal);
