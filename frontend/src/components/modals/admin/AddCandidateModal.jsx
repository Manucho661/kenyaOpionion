import React from "react";
import "./AddCandidateModal.css";


function AddCandidateModal({
  show,
  onClose,
  onSubmit,
  formData,
  onCandidateNameChange,
}) {
  if (!show) {
    return null;
  }

  return (
    <div className="ko-modal-backdrop" onClick={onClose}>
      <div
        className="ko-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="addCandidateModalTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ko-modal-header">
          <h2 className="ko-modal-title" id="addCandidateModalTitle">
            Add Candidate
          </h2>
          <button
            type="button"
            className="ko-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="ko-modal-body">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="candidateName" className="form-label">
                Candidate Name
              </label>
              <input
                type="text"
                className="form-control"
                id="candidateName"
                name="candidate_name"
                placeholder="e.g. Central"
                value={formData.candidate_name}
                onChange={onCandidateNameChange}
                autoFocus
              />
            </div>

            <button type="submit" className="btn ko-btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCandidateModal;