import ProgressiveImage from "react-progressive-image";
import * as Icon from "react-feather";
import FsLightbox from "fslightbox-react";
import React, { useState } from "react";

const AboutMe = ({ information }) => {
  const [toggler, setToggler] = useState(false);

  const handleToggler = () => {
    setToggler({
      toggler: !toggler
    });
  };
  return (
    <div className="mi-about-area mi-section mi-padding-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="mi-about-image">
              <ProgressiveImage
                src={information.aboutImage}
                placeholder="/images/about-image-placeholder.png"
              >
                {src => (
                  <img
                    src={src}
                    alt="aboutimage"
                    onClick={() => handleToggler(!toggler)}
                  />
                )}
              </ProgressiveImage>
              <span className="mi-about-image-icon">
                <Icon.ZoomIn />
              </span>
              <FsLightbox
                toggler={toggler}
                sources={[information.aboutImageLg]}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mi-about-content">
              <h3>
                I am <span className="color-theme">{information.name}</span>
              </h3>
              <p>{information.aboutMe}</p>
              <ul>
                {!information.name ? null : (
                  <li>
                    <b>Full Name</b> {information.name}
                  </li>
                )}
                {!information.age ? null : (
                  <li>
                    <b>Age</b> {information.age} Years
                  </li>
                )}
                {!information.phone ? null : (
                  <li>
                    <b>Phone</b> {information.phone}
                  </li>
                )}
                {!information.nationality ? null : (
                  <li>
                    <b>Nationality</b> {information.nationality}
                  </li>
                )}
                {!information.language ? null : (
                  <li>
                    <b>Languages</b> {information.language}
                  </li>
                )}
                {!information.email ? null : (
                  <li>
                    <b>Email</b> {information.email}
                  </li>
                )}
                {!information.address ? null : (
                  <li>
                    <b>Address</b> {information.address}
                  </li>
                )}
                {!information.freelanceStatus ? null : (
                  <li>
                    <b>Freelance</b> {information.freelanceStatus}
                  </li>
                )}
              </ul>
              <a href={information.cvfile} className="mi-button">
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
