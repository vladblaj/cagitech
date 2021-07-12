import TrackVisibility from "react-on-screen";
import React from "react";
import AboutMe from "./AboutMe";
import Sectiontitle from "./Sectiontitle";
import Progress from "./Progress";
import Smalltitle from "./Smalltitle";
import Resume from "./Resume";

const TeamMember = props => {
  const { information, skills, workingExperience, educationExperience } = props;

  return (
    <div className="container">
      <AboutMe information={information} />
      <Sectiontitle title="My Skills" />
      <div className="mi-skills">
        <div className="row mt-30-reverse">
          {skills &&
            skills.map(skill => (
              <TrackVisibility
                once
                className="col-lg-6 mt-30"
                key={skill.title}
              >
                <Progress title={skill.title} percentage={skill.value} />
              </TrackVisibility>
            ))}
        </div>
      </div>
      <div className="mi-resume-area mi-section mi-padding-top mi-padding-bottom">
        <div className="container">
          <Sectiontitle title="Resume" />
          <Smalltitle title="Working Experience" icon="briefcase" />
          <div className="mi-resume-wrapper">
            {workingExperience &&
              workingExperience.map(workingExp => (
                <Resume key={workingExp.id} resumeData={workingExp} />
              ))}
          </div>
          <div className="mt-30"></div>
          <Smalltitle title="Educational Qualifications" icon="book" />
          <div className="mi-resume-wrapper">
            {educationExperience &&
              educationExperience.map(educatonExp => (
                <Resume key={educatonExp.id} resumeData={educatonExp} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
