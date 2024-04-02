import React, { useState } from "react";
import "./JobList.css";
import JobCard from "../components/JobCard.jsx";
import Customselect from "../components/Customselect.jsx";
import "../App.css"; // Import the App.css file

const LocationFilter = ({ locations, selectedLocation, onLocationChange }) => {
  return (
    <div className="location-filter">
      <Customselect
        options={locations}
        value={selectedLocation}
        onChange={onLocationChange}
        placeholder="Filter by location"
      />
    </div>
  );
};

const JobList = ({ jobs }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const locations = Array.from(new Set(jobs.map((job) => job.location)));
  const filteredJobs = selectedLocation
    ? jobs.filter((job) => job.location === selectedLocation)
    : jobs;

  return (
    <div className="container">
      <h2>Job List</h2>
      <div className="select-container">
        <LocationFilter
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
        />
      </div>
      <div className="job-cards-container">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
