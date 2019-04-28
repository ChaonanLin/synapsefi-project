import React, { Component } from "react";
import "./Dropdown.css";

class Dropdown extends Component {
  state = {
    items: this.props.items || [],
    showItems: false,
    selectedItem: this.props.items && this.props.items[0]
  };

  dropDown = () => {
    this.setState(prevState => ({ showItems: !prevState.showItems }));
  };

  selectItem = item => {
    this.setState({ selectedItem: item, showItems: false });

    this.props.onAccountChange(item.value);
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
            {this.state.selectedItem.value}
          </div>
          <button
            className="select-box-arrow-container"
            tabIndex="0"
            onClick={this.dropDown}
          >
            <span
              className={
                this.state.showItems
                  ? "select-box-arrow-up"
                  : "select-box-arrow-down"
              }
            />
          </button>
          <div
            style={{ display: this.state.showItems ? "block" : "none" }}
            className="select-box-items"
          >
            {this.state.items.map(item => (
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
          value={this.state.selectedItem.id}
          name={this.state.selectedItem.value}
        />
      </div>
    );
  }
}

export default Dropdown;
