import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

// Dummy candidates data.
// Structured as an array so it can later be replaced with API data.
const initialCandidates = [
  { id: 1, name: "William Ruto" },
  { id: 2, name: "Edwin Sifuna" },
];

// Dummy regions data.
const initialRegions = [
  { id: 1, name: "Western" },
  { id: 2, name: "Nairobi" },
];

function Dashboard() {
  const [candidates] = useState(initialCandidates);
  const [regions] = useState(initialRegions);

  // Builds initials from a candidate's name, e.g. "William Ruto" -> "WR",
  // used for the placeholder profile image.
  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  // Placeholder for the future "add candidate" flow.
  const handleAddCandidateClick = () => {
    // TODO: Open the add-candidate form/modal once it is built.
    console.log("Add Candidate clicked");
  };

  // Placeholder for the future "add region" flow.
  const handleAddRegionClick = () => {
    // TODO: Open the add-region form/modal once it is built.
    console.log("Add Region clicked");
  };

  return (
    <div className="ko-dashboard-page">
      {/* Header */}
      <header className="ko-dash-header">
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" className="ko-dash-brand">
            KenyaOpinion <span className="ko-dash-brand-tag">Admin</span>
          </Link>

          <Link to="/login" className="btn ko-btn-outline">
            Logout
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="ko-dash-main">
        <div className="container">
          <div className="mb-4">
            <h1 className="ko-dash-title">Dashboard</h1>
            <p className="ko-dash-subtitle">
              Manage presidential candidates and the regions used in the
              opinion polls.
            </p>
          </div>

          <div className="row g-4">
            {/* Candidates - left side */}
            <div className="col-lg-6">
              <div className="card ko-dash-card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2 className="ko-dash-card-title">
                      Current Candidates
                    </h2>
                    <span className="ko-dash-count">
                      {candidates.length}
                    </span>
                  </div>

                  <ul className="list-group ko-dash-list">
                    {candidates.map((candidate) => (
                      <li
                        className="list-group-item ko-dash-list-item"
                        key={candidate.id}
                      >
                        <span className="ko-avatar">
                          {getInitials(candidate.name)}
                        </span>
                        {candidate.name}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="btn ko-btn-primary w-100 mt-3"
                    onClick={handleAddCandidateClick}
                  >
                    + Add Candidate
                  </button>
                </div>
              </div>
            </div>

            {/* Regions - right side */}
            <div className="col-lg-6">
              <div className="card ko-dash-card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2 className="ko-dash-card-title">Regions</h2>
                    <span className="ko-dash-count">{regions.length}</span>
                  </div>

                  <ul className="list-group ko-dash-list">
                    {regions.map((region) => (
                      <li
                        className="list-group-item ko-dash-list-item"
                        key={region.id}
                      >
                        {region.name}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="btn ko-btn-primary w-100 mt-3"
                    onClick={handleAddRegionClick}
                  >
                    + Add Region
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="ko-dash-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h4 className="ko-dash-footer-brand">KenyaOpinion</h4>
              <p className="ko-dash-footer-text">
                Tracking public opinion across Kenya.
              </p>
            </div>
            <div className="col-md-4 d-flex align-items-start justify-content-md-end gap-3">
              <Link to="/privacy" className="ko-dash-footer-link">
                Privacy
              </Link>
              <Link to="/terms" className="ko-dash-footer-link">
                Terms
              </Link>
            </div>
          </div>
          <hr className="ko-dash-footer-divider" />
          <p className="ko-dash-footer-copyright">
            &copy; {new Date().getFullYear()} KenyaOpinion. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;