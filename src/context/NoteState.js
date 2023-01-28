import React from 'react';
import { useState } from 'react';
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = 'http://localhost:5000';

    const userDetails = [];
    const initialNotes = [];

    const [userInfo, setUserInfo] = useState(userDetails);
    const [notes, setNotes] = useState(initialNotes);


    const getUserDetail = async () => {
        const url = '/api/auth/getuser';
        // API Call 
        const response = await fetch(`${host}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const userJson= await response.json();
        setUserInfo(userJson);
    }


    // get all notes
    const getNotes = async () => {
        const url = '/api/notes/fetchallnotes';
        // API Call to fetch all notes
        const response = await fetch(`${host}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const allNotes = await response.json();
        setNotes(allNotes);
    }


    // Add Note
    const addNote = async (title, tag, description) => {

        const url = '/api/notes/addnotes';
        // API Call to Add note
        const response = await fetch(`${host}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, tag, description })
            
        });
        
        // const addedNote = await response.json();
        // console.log(addedNote);

        // clinet side
        getNotes(); 
        // setNotes(notes.concat(addedNote));

    }



    // Edit Note
    const editNote = async (id, title, tag, description) => {

        const url = `/api/notes/updatenote/${id}`;
        // API Call to update note
        const response = await fetch(`${host}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, tag, description })
        });
        // const updatedNote = await response.json();
        // console.log(updatedNote);

        //logic for clinet side for not need to reload
        getNotes();
    }



    // Delete Note
    const deleteNote = async (id) => {

        const url = `/api/notes/deletsnotes/${id}`;
        // API Call
        const response = await fetch(`${host}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        // const notesAfterDelete = await response.json();
        // console.log(notesAfterDelete)

        // Client side 
        getNotes();
        // const newNotes = notes.filter((note) => { return note._id !== id});
        // setNotes(newNotes); 
    }


    return (
        <NoteContext.Provider value={{getUserDetail, userInfo, getNotes, notes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>

    )
}



export default NoteState;