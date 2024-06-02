import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'

function NotePage() {
    const { id } = useParams()

    const [note, setNote] = useState(null)

    useEffect(() => {
        async function noteData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/notes/${id}/`)
                const data = await response.json()
                setNote(data)
            } catch (error) {
                console.error(error)
            }
        }

        if (id !== "new") {
            noteData()
        }
    }, [])

    async function createData() {
        try {
            fetch(`http://127.0.0.1:8000/notes/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note)
            });
        } catch (error) {
            console.error(error)
        }
    }


    async function updateData() {
        try {
            fetch(`http://127.0.0.1:8000/notes/update/${id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note)
            });
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteData() {
        try {
            fetch(`http://127.0.0.1:8000/notes/delete/${id}/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) {
            console.error(error)
        }
    }
    const handleButton = () => {
        if (id !== "new" && note.body) {
            updateData()
        } else if (id !== "new" && !note.body) {
            deleteData()
        } else {
            createData()
        }
    }



    return (
        <div className='note'>
            <div className="note__header">
                <Link to="/">
                    <h3 onClick={handleButton}><ArrowLeft />Back</h3>
                </Link>
                <Link to="/">
                    {id !== "new" ? (
                        <h3 onClick={deleteData}>Delete</h3>
                    ) : (
                        <h3 onClick={handleButton}>Done</h3>
                    )}

                </Link>
            </div>

            <textarea onChange={(event) => setNote({ ...note, body: event.target.value })} value={note?.body}></textarea>


        </div>
    )
}

export default NotePage

