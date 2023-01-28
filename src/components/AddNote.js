import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'

const AddNote = () => {

    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote ] = useState({title: "", tag: "", description: ""});

    const onChange = (event) =>{        
        setNote({...note, [event.target.name]: event.target.value})        
    }

    const handleAddNote = (event) => {
        event.preventDefault();
        addNote(note.title, note.tag, note.description);
        setNote({title: "", tag: "", description: ""});
    }


    return (
        <div>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length < 5 || note.tag.length < 5 || note.description.length < 5} className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote