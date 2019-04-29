import React, { Component } from "react";
import Header from "./components/Header/Header";
import DashBoard from "./containers/DashBoard/DashBoard";
import axios from "axios";
import "./App.css";

class App extends Component {

  componentDidMount() {
    let data = {"refresh_token": "refresh_45KfjyFeCT0UABaqdbHZNzpr1oYsLW83i6QRSIc9"};

    let headers = {
      "X-SP-GATEWAY":
        "client_id_gcvWhR0VjZiawAr8JU6LpkN2bKtx5OmzulyFBM70|client_secret_3xDY0cMElJmeq7r6ZfIsPj2gBLTUOSyG1dnpt8VA",
      "X-SP-USER-IP": "73.241.31.11",
      "X-SP-USER": "|e83cf6ddcf778e37bfe3d48fc78a6502062fc",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };

    axios
      .post(`https://uat-api.synapsefi.com/v3.1/oauth/5cc13e09ad388f6fabe64d76`, data, {
        headers: headers
      })
      .then(res => {
        console.log(res);
      })
      .catch(res => {
        console.log("failed", res);
      });
  }

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
