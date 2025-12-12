import React from "react";
import "./card.css";

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-icon">
        <div className="icon">
          {props.icon}
        </div>
        <div className="card-info">
          <p className="card-title">{props.title}</p>
          <h5 className="percent">{props.description}</h5>
        </div>
      </div>
    </div>
  );
}
