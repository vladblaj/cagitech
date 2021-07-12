import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sectiontitle from "../components/Sectiontitle";
import Layout from "../components/Layout";
import TeamMember from "../components/TeamMember";

function Team() {
  const [skills, setSkills] = useState([]);
  const [workingExperience, setWorkingExperience] = useState([]);
  const [educationExperience, setEducationExperience] = useState([]);
  const [information, setInformation] = useState("");

  useEffect(() => {
    axios.get("/api/information").then(response => {
      setInformation(response.data);
    });
    axios.get("/api/skills").then(response => {
      setSkills(response.data);
    });
    axios.get("/api/experience").then(response => {
      setWorkingExperience(response.data.workingExperience);
      setEducationExperience(response.data.educationExperience);
    });
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Team - Bitlads Presentation Site</title>
        <meta
          name="description"
          content="Bitlads Presentation Site Resume Page"
        />
      </Helmet>
      <div className="mi-skills-area mi-section mi-padding-top">
        <div className="container">
          <Sectiontitle title="About Us" />
          <TeamMember
            information={information}
            skills={skills}
            workingExperience={workingExperience}
            educationExperience={educationExperience}
          />
          <TeamMember
            information={information}
            skills={skills}
            workingExperience={workingExperience}
            educationExperience={educationExperience}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Team;
