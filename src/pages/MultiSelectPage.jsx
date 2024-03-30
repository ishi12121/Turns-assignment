import React, { useState } from "react";
import Select from "../components/Select";
import JobCard from "../components/JobCard"; // Import the JobCard component

const MultiSelectPage = ({ jobs }) => {
  const [selectedJobs, setSelectedJobs] = useState([]);

  const handleJobSelect = (jobs) => {
    setSelectedJobs(jobs);
  };

  return (
    <div>
      <h2>Multi Select</h2>
      <Select
        options={jobs.map((job) => job.title)}
        isMulti
        value={selectedJobs}
        onChange={handleJobSelect}
      />
      {selectedJobs.length > 0 && (
        <div>
          <h3>Selected Jobs:</h3>
          <ul>
            {selectedJobs.map((jobTitle) => {
              const job = jobs.find((job) => job.title === jobTitle);
              return (
                <li key={job.id}>
                  <JobCard job={job} /> {/* Render the JobCard for each selected job */}
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
