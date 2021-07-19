import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sectiontitle from "../components/Sectiontitle";
import Layout from "../components/Layout";
import TeamMember from "../components/TeamMember";

function Team() {
  const [teamInformation, setTeamInformation] = useState([]);

  const getTeamInformation = async () => {
    const teamMembers = await axios.get("/api/team-members");
    const promises = teamMembers.data.map(teamMember => {
      return axios.get("/api/information", {
        params: {
          user: teamMember.user
        }
      });
    });
    return Promise.all(promises);
  };

  useEffect(() => {
    getTeamInformation().then(result => {
      setTeamInformation(
        result.filter(person => person.data).map(person => person.data)
      );
    });
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Team - Bitlads</title>
        <meta
          name="description"
          content="Bitlads Resume Page"
        />
      </Helmet>
      <div className="mi-skills-area mi-section mi-padding-top">
        <div className="container">
          <Sectiontitle title="About Us" />
          {teamInformation.map(information => (
            <TeamMember
              information={information}
              skills={information.skills}
              workingExperience={
                information && information.experience.workingExperience
              }
              educationExperience={
                information && information.experience.educationExperience
              }
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Team;
