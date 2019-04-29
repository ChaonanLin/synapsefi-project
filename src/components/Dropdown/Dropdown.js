import React, { Component } from "react";
import "./Dropdown.css";

class Dropdown extends Component {
  dropDown = () => {
    this.props.onDropdownChange();
  };

  selectItem = item => {
    this.props.onAccountChange(item);
  };

  keypress = e => {
    var code = e.which;
    if (code === 13 || code === 32) {
      e.target.click();
    }
  };

  render() {
    return (
      <div className="select-box">
        <div className="select-box-container">
          <div className="select-box-selected-item">
            {this.props.selectedAccount.value}
          </div>
          <button
            className="select-box-arrow-container"
            tabIndex="0"
            onClick={this.dropDown}
          >
            <span
              className={
                this.props.showItems
                  ? "select-box-arrow-up"
                  : "select-box-arrow-down"
              }
            />
          </button>
          <div
            style={{ display: this.props.showItems ? "block" : "none" }}
            className="select-box-items"
          >
            {this.props.items.map(item => (
              <div
                key={item.id}
                onClick={() => this.selectItem(item)}
                onKeyPress={this.keypress}
                role="button"
                className="itemslist"
                tabIndex="0"
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
        <input
          type="hidden"
          value={this.props.selectedAccount.id}
          name={this.props.selectedAccount.value}
        />
      </div>
    );
  }
}

export default Dropdown;
