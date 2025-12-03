import React from "react";

const DestinationCard = ({ destination }) => {
  const { name, country, image, price, description } = destination;

  return (
    <div className="destination-card" style={{ backgroundImage: `url(${image})` }}>

      <div className="card-content">
        <div className="card-top">

        <h3 className="destination-name">{name}</h3>
        <p className="destination-country">{country}</p>
        </div>
        <p className="destination-description">{description}</p>
        <div className="card-footer">
          <span className="destination-price">₩{price.toLocaleString()}</span>
          <button className="btn--block btn">Book a Hotel</button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
