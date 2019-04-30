import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "../../components/Dropdown/Dropdown.js";
import CurrencyInput from "react-currency-input";
import "./PaymentModal.css";
import axios from "axios";
import {
  onModalChange,
  changeDropdown,
  changeTransAmount,
  changeAccount
} from "../.././store/actions/actions";

class PaymentModal extends Component {
  //get auth_key from state store and get it ready to be passed to request headers
  auth_key = this.props.authKey.concat("", "|");
  //headers that can be use for both CashOut and AddCash requests
  headers = {
    "X-SP-GATEWAY":
      "client_id_gcvWhR0VjZiawAr8JU6LpkN2bKtx5OmzulyFBM70|client_secret_3xDY0cMElJmeq7r6ZfIsPj2gBLTUOSyG1dnpt8VA",
    "X-SP-USER-IP": "73.241.31.11",
    "X-SP-USER": this.auth_key,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  CashOut = () => {
    //when cashout, set the data.to object the selected account
    let data = {
      to: {
        type: this.props.selectedAccount.type,
        id: this.props.selectedAccount._id
      },
      amount: {
        // remove the $
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
          headers: this.headers
        }
      )
      .then(res => {
        console.log("transaction made");
        this.props.onModalChange();
        //reload the page to get new transaction shows
        window.location.reload();
      })
      .catch(res => {
        alert(
          "Oh no,something happened and the transaction has not been made. Please refresh the page and try later."
        );
        console.log("failed", res);
      });
  };

  AddCash = () => {
    //when add cash to current account, set the data.to object the current account info
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

    //when add cash to current account, set the selected account id as the transfer from account by adding its id to request url
    let url =
      "https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes/" +
      this.props.selectedAccount._id +
      "/trans";

    axios
      .post(url, data, {
        headers: this.headers
      })
      .then(res => {
        console.log("transaction made");
        this.props.onModalChange();
        window.location.reload();
      })
      .catch(res => {
        alert(
          "Oh no,something happened and the transaction has not been made. Please refresh the page and try later."
        );
        console.log("failed", res);
      });
  };

  handleSubmit = e => {
    //prevent auto reload before the API called
    e.preventDefault();

    if (this.props.modalType === "add cash") {
      this.AddCash();
    }
    if (this.props.modalType === "cash out") {
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
            {this.props.modalType === "add cash" ? "ADD CASH" : "CASH OUT"}
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
              items={this.props.otherAccounts}
              selectedAccount={this.props.selectedAccount}
              showItems={this.props.showDropdownItems}
              onAccountChange={item => this.props.changeAccount(item)}
              onDropdownChange={this.props.changeDropdown}
            />
          </div>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <input
              type="submit"
              value={
                this.props.modalType === "add cash" ? "Add Cash" : "Cash Out"
              }
              className="payment-button"
              name={
                this.props.modalType === "add cash" ? "Add Cash" : "Cash Out"
              }
              id={this.props.modalType === "add cash" ? "Add Cash" : "Cash Out"}
            />
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    authKey: state.authKey,
    modalType: state.modalType,
    amount: state.transactionAmount,
    showDropdownItems: state.showDropdownItems,
    otherAccounts: state.otherAccounts,
    selectedAccount: state.selectedAccount._id
      ? state.selectedAccount
      : state.otherAccounts[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onModalChange: modalType => dispatch(onModalChange(modalType)),
    changeAmount: (event, maskedvalue, floatvalue) =>
      dispatch(changeTransAmount(event, maskedvalue, floatvalue)),
    changeDropdown: () => dispatch(changeDropdown()),
    changeAccount: item => dispatch(changeAccount(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentModal);
