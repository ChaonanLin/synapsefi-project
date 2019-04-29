import React, { Component } from "react";
import Dropdown from "../../components/Dropdown/Dropdown.js";
import CurrencyInput from "react-currency-input";
import "./PaymentModal.css";

class PaymentModal extends Component {
  state = {
    bankAcounts: [
      { value: "saving account ending 9968", id: 1 },
      { value: "checking account ending 1234", id: 2 },
      { value: "checking account ending 1234", id: 3 },
      { value: "checking account ending 1234", id: 4 }
    ],
    amount: "0.00",
    selectedAccount: { value: "saving account ending 9968", id: 1 },
    showDropdownItems: false
  };

  changeAmount = (event, maskedvalue, floatvalue) => {
    this.setState({ amount: maskedvalue });
  };

  changeDropdown = () => {
    this.setState(prevState => ({
      showDropdownItems: !prevState.showDropdownItems
    }));
  };

  changeAccount = item => {
    this.setState({ selectedAccount: item, showDropdownItems: false });
  };

  closeModal = () => {
    this.props.onCloseModal();
  };

  render() {
    const bankAcounts = [
      { value: "saving account ending 9968", id: 1 },
      { value: "checking account ending 1234", id: 2 },
      { value: "checking account ending 1234", id: 3 },
      { value: "checking account ending 1234", id: 4 }
    ];

    return (
      <div className="payment-container">
        <div className="payment-close" onClick={this.closeModal}>
          <i className="fas fa-times" />
        </div>
        <div className="payment-title">
          {this.props.type === "add cash" ? "ADD CASH" : "CASH OUT"}
        </div>
        <div className="payment-divider" />
        <div className="payment-description">
          You have $349,671.52 available in cash. How much would you like to add
          cash to your CARD-US account?
        </div>
        <div className="payment-input-container">
          <CurrencyInput
            prefix="$"
            className="payment-input"
            id="payment-input"
            value={this.state.amount}
            onChangeEvent={this.changeAmount}
          />
        </div>
        <div className="payment-account-dropdown">
          <Dropdown
            items={this.state.bankAcounts}
            selectedAccount={this.state.selectedAccount}
            showItems={this.state.showDropdownItems}
            onAccountChange={this.changeAccount}
            onDropdownChange={this.changeDropdown}
          />
        </div>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <input
            type="submit"
            value={this.props.type === "add cash" ? "Add Cash" : "Cash Out"}
            className="payment-button"
            name={this.props.type === "add cash" ? "Add Cash" : "Cash Out"}
            id={this.props.type === "add cash" ? "Add Cash" : "Cash Out"}
            disabled={true}
          />
        </div>
      </div>
    );
  }
}

export default PaymentModal;
