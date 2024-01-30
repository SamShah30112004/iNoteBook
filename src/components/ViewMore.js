import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ViewMore = () => {
  const { state } = useLocation();

  // Assuming state is always available
  const { note } = state;
  const normalDate = new Date(note.date);
  const Dates = normalDate.toLocaleString();
  return (
    <>
      <div>
        <h1>{note.title}</h1>
        <div className="d-flex align-items-center">
          <h5 className="mt-2">
            Date Created: {Dates}
            <span className="badge bg-primary mx-2">{note.tag}</span>
          </h5>
        </div>
        <hr></hr>
        {note.description}
      </div>
      <Link to="/">
        <button type="button" className="btn btn-primary btn-sm my-3">
          Back
        </button>
      </Link>
    </>
  );
};

export default ViewMore;
