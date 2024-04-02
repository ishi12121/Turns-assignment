import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import JobList from "./pages/JobList";
import jobs from "./data/jobs";
import MultiSelectPage from "./pages/MultiSelectPage";
import SingleSelectPage from "./pages/SingleSelectPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/single-select">Single Select</Link>
            </li>
            <li>
              <Link to="/multi-select">Multi Select</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<JobList jobs={jobs} />} />
          <Route
            path="/single-select"
            element={<SingleSelectPage jobs={jobs} />}
          />
          <Route
            path="/multi-select"
            element={<MultiSelectPage jobs={jobs} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
