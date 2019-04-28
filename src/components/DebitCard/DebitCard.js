import React from "react";
import Logo from "../.././asset/Logo.png";
import "./DebitCard.css";

const DebitCard = props => {
  return (
    <div className="card-container">
      <div className="card-content">
        <div style={{ width: "100%" }}>
          <img className="logo-img" src={Logo} alt="logo" />
        </div>
        <div className="card-number card-font__number">1234 5678 3215</div>
        <div className="icon-container">
          <div style={{ marginLeft: "40%", width: "25%", padding: 5 }}>
            <div className="icon-roundmask">
              <i className="fas fa-copy" />
            </div>
          </div>
          <div style={{ marginLeft: "10%", width: "25%", padding: 5 }}>
            <div className="icon-roundmask">
                <i className="fas fa-unlock-alt" />
            </div>
          </div>
        </div>
        <div className="card-info card-font__info">Chaonan Lin</div>
        <div className="card-info card-font__info">EXP 6/21 CVC 123</div>
      </div>
      <div className="card-type-logo-container">
        <img className="card-type-logo-img" src={Logo} alt="logo" />
      </div>
    </div>
  );
};

export default DebitCard;
