import React from "react";
import LineIcon from "react-lineicons";

function Service(props) {
  const { content } = props;
  return (
    <div className="mi-service">
      <span className="mi-service-icon">
        <LineIcon name={content.icon} />
      </span>
      <h5>{content.title}</h5>
      <p>{content.details}</p>
    </div>
  );
}

export default Service;
