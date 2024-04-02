// MultiSelectPage.jsx
import React, { useState } from "react";
import JobCard from "../components/JobCard";
import Customselect from "../components/Customselect";
import '../App.css'; // Import the App.css file

const MultiSelectPage = ({ jobs }) => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const handleJobSelect = (jobs) => {
    setSelectedJobs(jobs);
  };

  return (
    <div className="container">
      <h2>Multi Select</h2>
      <div className="select-container">
        <Customselect
          options={jobs.map((job) => job.title)}
          isMulti
          value={selectedJobs}
          onChange={handleJobSelect}
        />
      </div>
      {selectedJobs.length > 0 && (
        <div>
          <h3>Selected Jobs:</h3>
          <ul>
            {selectedJobs.map((jobTitle) => {
              const job = jobs.find((job) => job.title === jobTitle);
              return (
                <li key={job.id}>
                  <JobCard job={job} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectPage;