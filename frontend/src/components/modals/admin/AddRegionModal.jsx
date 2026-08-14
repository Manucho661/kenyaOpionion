import React from "react";
import "./AddRegionModal.css";

// AddRegionModal
//
// This is a presentational component only — it holds no state and no
// submit/validation logic of its own. All of that (the region name
// value, updating it, and what happens on submit) is handled by the
// parent component (Dashboard) and passed in through these props:
//
// Props:
// - show (boolean)               : whether the modal is visible. When
//                                   false, the component renders nothing.
// - onClose (function)           : called when the user closes the modal
//                                   (backdrop click or the × button).
// - onSubmit (function)          : called when the form is submitted
//                                   (receives the form submit event —
//                                   the parent decides whether to call
//                                   event.preventDefault()).
// - regionName (string)          : the current value of the region
//                                   name input, owned by the parent.
// - onRegionNameChange (function): called with the input's change event
//                                   whenever the user types, so the
//                                   parent can update regionName.
function AddRegionModal({
  show,
  onClose,
  onSubmit,
  formData,
  onRegionNameChange,
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
        aria-labelledby="addRegionModalTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ko-modal-header">
          <h2 className="ko-modal-title" id="addRegionModalTitle">
            Add Region
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
              <label htmlFor="regionName" className="form-label">
                Region Name
              </label>
              <input
                type="text"
                className="form-control"
                id="regionName"
                name="region_name"
                placeholder="e.g. Central"
                value={formData.region_name}
                onChange={onRegionNameChange}
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

export default AddRegionModal;