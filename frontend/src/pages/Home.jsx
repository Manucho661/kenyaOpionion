import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";

// Dummy overall poll results.
// Structured as an array so it can later be replaced with API data.
const overallResults = [
    { id: 1, name: "William Ruto", percentage: 60 },
    { id: 2, name: "Kalonzo Musyoka", percentage: 40 },
];

// Dummy regional poll results.
// Each region has its own list of candidates so more regions/candidates
// can be added later without changing the component structure.
const regionalResults = [
    {
        id: 1,
        region: "Western",
        candidates: [
            { id: 1, name: "William Ruto", percentage: 55 },
            { id: 2, name: "Kalonzo Musyoka", percentage: 45 },
        ],
    },
    {
        id: 2,
        region: "Nairobi",
        candidates: [
            { id: 1, name: "William Ruto", percentage: 62 },
            { id: 2, name: "Kalonzo Musyoka", percentage: 38 },
        ],
    },
];

function Home() {
    // Placeholder for the future voting modal.
    // For now, clicking Vote does not open anything.
    const handleVoteClick = () => {
        // TODO: Connect this to the voting modal once it is built.
        console.log("Vote button clicked - voting modal not implemented yet.");
    };

    // logged in user
    const user = localStorage.getItem("userName");;
    console.log(user);

    return (
        <div className="ko-page">
            {/* Navigation / Header */}
            <Header user={user} />

            <div className="main">
                {/* Hero / Welcome Section */}
                <section className="ko-hero">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <h1 className="ko-hero-title">Welcome to KenyaOpinion</h1>
                                <p className="ko-hero-text">
                                    Follow public opinion and see how presidential candidates are
                                    performing across different regions of Kenya.
                                </p>
                            </div>
                            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                                <button
                                    type="button"
                                    className="btn ko-btn-vote"
                                    onClick={handleVoteClick}
                                >
                                    Vote Now
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Overall Poll Results */}
                <section className="ko-section">
                    <div className="container">
                        <h2 className="ko-section-title">Overall Poll Results</h2>
                        <p className="ko-section-subtitle">
                            Current national standing based on collected votes.
                        </p>

                        <div className="ko-results-card">
                            {overallResults.map((candidate) => (
                                <div className="ko-result-row" key={candidate.id}>
                                    <div className="ko-result-header">
                                        <span className="ko-candidate-name">{candidate.name}</span>
                                        <span className="ko-candidate-percentage">
                                            {candidate.percentage}%
                                        </span>
                                    </div>
                                    <div className="progress ko-progress" role="progressbar">
                                        <div
                                            className="progress-bar ko-progress-bar"
                                            style={{ width: `${candidate.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Regional Statistics */}
                <section className="ko-section ko-section-alt">
                    <div className="container">
                        <h2 className="ko-section-title">Regional Opinion</h2>
                        <p className="ko-section-subtitle">
                            See how the candidates are performing across selected regions of
                            Kenya.
                        </p>

                        <div className="row g-4">
                            {regionalResults.map((region) => (
                                <div className="col-md-6" key={region.id}>
                                    <div className="card ko-region-card">
                                        <div className="card-body">
                                            <h3 className="ko-region-title">{region.region}</h3>

                                            {region.candidates.map((candidate) => (
                                                <div className="ko-result-row" key={candidate.id}>
                                                    <div className="ko-result-header">
                                                        <span className="ko-candidate-name">
                                                            {candidate.name}
                                                        </span>
                                                        <span className="ko-candidate-percentage">
                                                            {candidate.percentage}%
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="progress ko-progress"
                                                        role="progressbar"
                                                    >
                                                        <div
                                                            className="progress-bar ko-progress-bar"
                                                            style={{ width: `${candidate.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="ko-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="ko-footer-brand">KenyaOpinion</h4>
                            <p className="ko-footer-text">
                                Tracking public opinion across Kenya.
                            </p>
                        </div>
                        <div className="col-md-4 d-flex align-items-start justify-content-md-end gap-3">
                            <Link to="/privacy" className="ko-footer-link">
                                Privacy
                            </Link>
                            <Link to="/terms" className="ko-footer-link">
                                Terms
                            </Link>
                        </div>
                    </div>
                    <hr className="ko-footer-divider" />
                    <p className="ko-footer-copyright">
                        &copy; {new Date().getFullYear()} KenyaOpinion. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Home;