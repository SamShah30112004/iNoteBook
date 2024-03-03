import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: '',
      description: '',
      tag: '',
    });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-3">
      <h2>Add a Blog</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Content
          </label>
          <textarea type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} rows={8} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnote;
