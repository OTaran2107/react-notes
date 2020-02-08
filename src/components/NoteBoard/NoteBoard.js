import React, { useState, useEffect } from 'react'
import NoteItem from '../NoteItem/NoteItem'
import './NoteBoard.css'
import { notesDB } from '../../data'
import { getColor } from '../../palette'

function NoteBoard() {

    const data = localStorage.notesBackUp ? JSON.parse(localStorage.notesBackUp) : notesDB.map(item => {
        return {
            ...item,
            color: getColor()
        }
    });
    const [notes, setNotes] = useState(data);

    const deleteNote = (id) => {
        const newNotes = notes.filter(item => {
            return item.id !== id;
        });
        setNotes(newNotes);
    }

    useEffect(() => {
        saveToStorage();
    }, [notes]);

    const editNote = (note) => {
        const newNotes = notes.map(item => {
            if (item.id !== note.id) return item;
            else return note;
        });
        setNotes(newNotes);
    }

    const addNote = () => {
        const newNotes = notes.slice();
        const newId = Math.round(new Date().getTime() / 1000);
        newNotes.push({
            id: newId,
            title: '#' + newId,
            text: '',
            color: getColor(),
            x: 100,
            y: 100
        });
        setNotes(newNotes);
    }

    const saveToStorage = () => {
        const data = JSON.stringify(notes);
        localStorage.setItem('notesBackUp', data);
    }

    return (
        <>
            <button onClick={addNote}>
                <img className="add-btn" src="https://image.flaticon.com/icons/png/512/189/189689.png" alt="" />
            </button>
            <div className="note-board">
                {notes.map((note) => (
                    <NoteItem key={note.id} value={note} onDelete={deleteNote} onEdit={editNote} />
                ))}
            </div>
        </>
    )
}

export default NoteBoard
