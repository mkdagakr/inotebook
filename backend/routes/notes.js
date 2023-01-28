const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Notes')

// Router 1: Get all the notes using GET: */api/notes/fetchallnotes: Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {

        // console.log(error.message);
        response.status(500).send('some error occured');
    }
})

// Router 2: add notes using POST: */api/notes/addnotes: Login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.json() });
    }

    try {
        const { title, description, tag } = req.body;

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();

        res.json(saveNote);

    } catch (error) {
        // console.log(error.message);
        response.status(500).send('some error occured');

    }
})

// Router 3: update existing note using PUT: */api/notes/updatenote: Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title; }
        if (tag) { newNote.tag = tag; }
        if (description) { newNote.description = description; }

        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found");
        }
        // verify user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note)

    } catch (error) {
        // console.log(error.message);
        response.status(500).send('some error occured');

    }
})


// Router 4: delete existing notes using DELETE: */api/notes/addnotes: Login required

router.delete('/deletsnotes/:id', fetchuser, async (req, res) => {

    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found");
        }
        // verify user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been successfully Deleted", note: note })

    } catch (error) {
        // console.log(error.message);
        response.status(500).send('some error occured');

    }
})

module.exports = router;