import React, { useContext, useEffect, useState, useRef } from 'react';
import noteContext from '../context/NoteContext';
import NoteCard from './NoteCard';
import { useNavigate } from 'react-router-dom';

const Note = () => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote, getUserDetail } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getUserDetail();
            getNotes();
        }
        else{
            navigate('/');
        }
    }, [])


    const ref = useRef(null);
    const refClose = useRef(null);
    const [updateNote, setUpdateNote ] = useState({eid: "", etitle: "", etag: "", edescription: ""});

    const handleUpdateNote = (currentNote) => {
        setUpdateNote({eid: currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description});
        ref.current.click();
    }


    const onChange = (event) =>{        
        setUpdateNote({...updateNote, [event.target.name]: event.target.value})        
    }

    const handleAddNote = (event) => {
        // event.preventDefault();  we are not using preventDefault() because we use this when button/handleAddNote was a part of <form>s element
        editNote(updateNote.eid, updateNote.etitle, updateNote.etag, updateNote.edescription);
        refClose.current.click();
    }
    

    return (
        <>
        {/*Button trigger modal and I used className='d-none' that's why button donot show on screen */}
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/*Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={updateNote.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={updateNote.etag} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={updateNote.edescription} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className='row my-3'>

                {notes.map((note) => {
                    return <NoteCard key={note._id} handleUpdateNote={handleUpdateNote} note={note} />
                })}

            </div>
        </>
    )
}

export default Note;