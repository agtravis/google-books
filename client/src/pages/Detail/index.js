import React, { useEffect, useState } from 'react';
import API from '../../utils/API';

function Detail(props) {
  const [book, setBook] = useState({});
  const [newNotes, setNewNotes] = useState(``);

  useEffect(() => {
    API.getBook(props.match.params.id)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.error(err));
  }, [props.match.params.id]);

  const handleChangeNotes = (event) => {
    setNewNotes(event.target.value);
  };

  const setInput = () => {
    document.getElementById('notes-form').classList.remove('hide');
    setNewNotes(book.notes);
    setBook({ ...book }, (book.notes = ``));
    document.getElementById(`notes-field`).focus();
  };

  const deleteNote = () => {
    setBook({ ...book }, (book.notes = ``));
    API.updateBook(props.match.params.id, book)
      .then((data) => {
        setBook({ ...book });
      })
      .catch((err) => console.error(err));
  };

  const handleSubmitNotes = (event) => {
    event.preventDefault();
    setBook({ ...book }, (book.notes = newNotes));
    setNewNotes(``);
    API.updateBook(props.match.params.id, book)
      .then((data) => {
        setBook({ ...book });
        document.getElementById('notes-form').classList.add('hide');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h3>{book.title}</h3>
      {book.notes !== `` ? <p>Click on your note to edit it</p> : null}
      <img src={book.image} alt={book.title} />
      <p style={{ cursor: 'pointer' }}>
        <span onClick={() => setInput()}>
          {book.notes !== ``
            ? book.notes
            : `You haven't written any notes for this book yet! Click this message to write one.`}
        </span>
        {book.notes !== `` ? (
          <span style={{ marginLeft: '15px' }}>
            <i
              style={{ cursor: 'pointer' }}
              className="material-icons"
              onClick={() => deleteNote()}
            >
              delete_forever
            </i>
          </span>
        ) : (
          ``
        )}
      </p>
      <form
        className="hide"
        id="notes-form"
        onSubmit={(event) => handleSubmitNotes(event)}
      >
        <textarea
          id="notes-field"
          value={newNotes}
          onChange={(event) => handleChangeNotes(event)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Detail;
