import React, { Component } from "react";
import Dropdown from ".././Dropdown/Dropdown.js";
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
    selectedAccount: ""
  };

  changeAmount = (event, maskedvalue, floatvalue) => {
    this.setState({ amount: maskedvalue });
  };

  changeAccount = value => {
    this.setState({ selectedAccount: value });
  };

  closeModal = () => {
    this.props.onCloseModal();
  };

  render() {
    return (
      <form>
        <div className="payment-container">
          <div className="payment-close" onClick={this.closeModal}>
            <i className="fas fa-times" />
          </div>
          <div className="payment-title">ADD CASH</div>
          <div className="payment-divider" />
          <div className="payment-description">
            You have $349,671.52 available in cash. How much would you like to
            add cash to your CARD-US account?
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
              onAccountChange={this.changeAccount}
            />
          </div>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <input
              type="submit"
              value="Add Cash"
              className="payment-button"
              name="add cash"
              id="add cash"
              disabled={true}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default PaymentModal;
