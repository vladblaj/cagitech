import React from "react";

function Resume(props) {
  const { resumeData } = props;
  const {
    year,
    position,
    graduation,
    university,
    company,
    details
  } = resumeData;
  return (
    <div className="mi-resume mt-30">
      <div className="mi-resume-summary">
        <h6 className="mi-resume-year">{year}</h6>
      </div>
      <div className="mi-resume-details">
        <h5>{position || graduation}</h5>
        <h6 className="mi-resume-company">{company || university}</h6>
        <div style={{ "white-space": "pre-line" }}>{details}</div>
      </div>
    </div>
  );
}

export default Resume;
