import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AddButton from "../component/AddButton";

function NotesListPage() {
    let [notes, setNotes] = useState([])

    const getTitle = (note) => {
        let title = note.body.split("\n")[0]
        if (title.length > 45) {
            return title.slice(0, 45)
        }
        return title
    }

    const getDate = (note) => {
        const date = new Date(note.updated).toLocaleDateString()
        return date
    }


    const getContent = (note) => {
        const title = getTitle(note)
        let content = note.body.replaceAll("\n", " ")
        content = content.replaceAll(title, "")
        if (content.length > 45) {
            return content.slice(0, 45) + "..."
        }
        return content

    }



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://127.0.0.1:8000/notes/")
                const data = await response.json()
                setNotes(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])


    return (
        <div className="notes">
            <div className="notes__header">
                <h2 className="notes__title">&#9782; Notes</h2>
                <p className="notes__count">{notes.length}</p>
            </div>
            {notes.map((note) => {
                return (
                    <Link to={`/note/${note.id}`} key={note.id}>
                        <div className="notes__list__item">
                            <p>{getTitle(note)}</p>
                            <p><span>{getDate(note)}</span>{getContent(note)}</p>
                        </div>
                    </Link>
                )
            })}
            <AddButton />
        </div>

    );
}


export default NotesListPage;