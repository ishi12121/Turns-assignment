
import React, { useState } from "react";
import Customselect from "../components/Customselect";
import "../App.css";
import AltCustomselect from "../components/AltCustomselect";

const MultiSelectPageAlt = ({ jobs }) => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const handleJobSelect = (jobs) => {
    setSelectedJobs(jobs);
  };

  return (
    <div className="container">
      <h2>Multi Select - Input Display</h2>
      <div className="input-display-container">
        <AltCustomselect
          options={jobs.map((job) => job.title)}
          isMulti
          value={selectedJobs}
          onChange={handleJobSelect}
          placeholder="Select job(s)"
        />
      </div>
      {selectedJobs.length > 0 && (
        <div>
          <h3>Selected Jobs:</h3>
          <div className="selected-jobs-container">
            {selectedJobs.map((jobTitle) => {
              const job = jobs.find((job) => job.title === jobTitle);
              return (
                <div key={job.id} className="selected-job">
                  {job.title}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectPageAlt;
