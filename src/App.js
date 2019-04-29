import React, { Component } from "react";
import Header from "./components/Header/Header";
import DashBoard from "./containers/DashBoard/DashBoard";
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="DashBoard-section">
          <DashBoard />
        </div>
      </div>
    );
  }
}

export default App;
