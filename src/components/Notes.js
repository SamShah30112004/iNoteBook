import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { nota, notes, getNotes, editNote, sortByTag } = context;
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: '',
  });

  const [sortByTagClicked, setSortByTagClicked] = useState(false);

  const handleSortByTagClick = (tag) => {
    setSortByTagClicked(true); // Toggle the state
    sortByTag(tag);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = (e) => {
    refClose.current.click();
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Blog
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title
                </label>
                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Content
                </label>
                <textarea
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  onChange={onChange}
                  value={note.edescription}
                  rows="5" // Adjust the number of rows as needed
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Tag
                </label>
                <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Blog
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <div className="d-flex align-items-center mt-4">
          <h2 className="mt-2">Your Notes</h2>
          <div class="btn-group">
            <button type="button" class="btn btn-primary dropdown-toggle mx-2 mt-2 btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
              Sort By Tag
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                {Array.from(new Set(notes.map((note) => note.tag))).map((tag) => (
                  <button className="dropdown-item" type="button" onClick={() => handleSortByTagClick(tag)}>
                    {tag}
                  </button>
                ))}
              </li>

              <li>
                <button
                  class="dropdown-item"
                  type="button"
                  onClick={() => {
                    setSortByTagClicked(false);
                  }}>
                  Remove Sort
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="row my-3">{sortByTagClicked ? nota.map((note) => <Noteitem key={note._id} updateNote={updateNote} note={note} />) : notes.map((note) => <Noteitem key={note._id} updateNote={updateNote} note={note} />)}</div>
      </div>
    </>
  );
};

export default Notes;
