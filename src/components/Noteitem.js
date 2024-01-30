import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, getNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-3" key={note.id}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title.length > 25 ? `${note.title.slice(0, 25)}...` : note.title}</h5>
          <p className="card-text">{note.description.length > 30 ? `${note.description.slice(0, 30)}...` : note.description}</p>
          <Link to="/viewmore" state={{ note: note }}>
            <button
              type="button"
              class="btn btn-success btn-sm"
              disabled={note.description.length < 31}
              onClick={() => {
                getNote(note._id);
              }}>
              View More
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-primary btn-sm m-2"
            onClick={() => {
              updateNote(note);
            }}>
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => {
              deleteNote(note._id);
            }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
