import React, {useState} from 'react'
import './NoteItem.css'

function NoteItem(props) {
    const [note, setNote] = useState(props.value);
    const [editMode, setEditMode] = useState(false);

    function handleMouseDown(e) {
        setPosition(e.pageX, e.pageY);
        document.onmousemove = function (e) {
            setPosition(e.pageX, e.pageY);
        }
    }

    function handleMouseUp() {
        document.onmousemove = null;
    }

    function setPosition(x, y) {
        const updatedNote = {
            ...note,
            x: x - 100,
            y: y - 30
        };
        setNote(updatedNote);
        props.onEdit(updatedNote);
    }

    function onNoteChange(e) {
        const updatedNote = {
            ...note,
            [e.target.name]: e.target.value
        };
        setNote(updatedNote);
        props.onEdit(updatedNote);
    }

    function onDeleteBtnClick() {
        props.onDelete(note.id);
    }

    const btnClose = (
        <svg width="20px" viewBox="0 0 24 24">
            <g>
                <path fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"
                      d="M16,19H8c-0.552,0-1-0.448-1-1V6h10v12C17,18.552,16.552,19,16,19z">
                </path>
                <line fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" x1="5" y1="6" x2="19" y2="6">
                </line>
                <path fill="white" d="M13,5h-2V4c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1V5z">
                </path>
            </g>
        </svg>
    );

    function handleDragStart() {
        return false;
    };

    function toViewMode() {
        setEditMode(false);
    };

    function toEditMode(e) {
        setEditMode(true);
    };

    return (
        <div
            className="note"
            style={{
                top: note.y,
                left: note.x,
            }}
        >
            <div className="note-header"
                 style={{
                     backgroundColor: note.color
                 }}
            >
                <img className="note-pin" src="https://i.imgur.com/9veNsY8.png" alt=""/>
                {editMode ? (
                    <input
                        className="edit-mode"
                        name="title"
                        value={note.title}
                        placeholder="Enter title"
                        onChange={onNoteChange}
                        onBlur={toViewMode}
                    />
                ) : (
                    <span
                        className="view-mode"
                        onClick={toEditMode}
                    >{note.title}
                        </span>
                )
                }
                <div
                    className="note-move"
                    onDragStart={handleDragStart}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                />
                <button className="note-delete-btn" onClick={onDeleteBtnClick}>{btnClose}</button>
            </div>
            <div className="note-content">
                <textarea
                    id="story"
                    name="text"
                    value={note.text}
                    rows="5"
                    cols="33"
                    placeholder="Write here some notes..."
                    onChange={onNoteChange}
                >
                </textarea>
            </div>
        </div>
    )
}

export default NoteItem;
