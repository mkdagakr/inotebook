import React, { useContext } from 'react'
import noteContext from '../context/NoteContext';

const NoteCard = (props) => {
    const { note, handleUpdateNote } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;

    

    return (
        <>            
            <div className='col-md-3'>
                <div className="card my-3">
                    <div className="card-body">
                        <div className='d-flex justify-content-between'>
                            <h5 className="card-title ">{note.title}</h5>
                            <div>
                                <i className="fa-solid fa-trash mx-2" onClick={() => (deleteNote(note._id))}></i>
                                <i className="fa-solid fa-pen-to-square mx-2" onClick={() => (handleUpdateNote(note))}></i>
                            </div>
                        </div>
                        <p className="card-text">{note.description} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteCard;