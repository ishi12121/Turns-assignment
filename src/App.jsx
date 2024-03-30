import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobList from './components/JobList';
import SingleSelectPage from './pages/SingleSelectPage';
import MultiSelectPage from './pages/MultiSelectPage';
import jobs from './data/jobs';
import './App.css'; // Import your CSS file

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-links"> {/* Added a class for styling */}
            <li>
              <Link to="/">Job List</Link>
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
          <Route path="/single-select" element={<SingleSelectPage jobs={jobs} />} />
          <Route path="/multi-select" element={<MultiSelectPage jobs={jobs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
