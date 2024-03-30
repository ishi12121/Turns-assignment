import React, { useState } from "react";
import Select from "../components/Select";
import JobCard from "../components/JobCard"; // Import the JobCard component

const SingleSelectPage = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  return (
    <div>
      <h2>Single Select</h2>
      <Select
        options={jobs.map((job) => job.title)}
        value={selectedJob}
        onChange={handleJobSelect}
      />
      {selectedJob && (
        <div>
          <h3>Selected Job:</h3>
          <JobCard job={jobs.find((job) => job.title === selectedJob)} />{" "}
          {/* Render the JobCard with the selected job */}
        </div>
      )}
    </div>
  );
};

export default SingleSelectPage;
