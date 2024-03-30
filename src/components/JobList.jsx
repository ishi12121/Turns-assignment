import React, { useState } from "react";
import Select from "./Select";
import "./JobList.css"; // Import your CSS file
import JobCard from "./JobCard"; // Import the JobCard component

const JobList = ({ jobs }) => {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const filteredJobs = selectedLocation
    ? jobs.filter((job) => job.location === selectedLocation)
    : jobs;

  return (
    <div className="job-list-container">
      <h2>Job List</h2>
      <Select
        options={Array.from(new Set(jobs.map((job) => job.location)))}
        value={selectedLocation}
        onChange={handleLocationChange}
      />
      <div className="job-cards-container">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
