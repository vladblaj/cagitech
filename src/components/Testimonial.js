import React from "react";

function Testimonial(props) {
  const { content } = props;
  return (
    <div className="mi-testimonial-slideritem">
      <div className="mi-testimonial">
        <div className="mi-testimonial-content">
          <p>{content.content}</p>
        </div>
        <div className="mi-testimonial-author">
          <h5>{content.author.name}</h5>
          <h6>{content.author.designation}</h6>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
