
import React from "react";
import "./JobCard.css"; 

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job?.title}</h3>
      <p>Location: {job?.location}</p>
      <p>Type: {job?.isRemote ? "Remote" : "On-site"}</p>
      <p>Salary: {job?.salary}</p>
    </div>
  );
};

export default JobCard;
