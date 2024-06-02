import React from 'react'
import { ReactComponent as ArrowButton } from '../assets/add.svg'
import { Link } from 'react-router-dom'

function AddButton() {
    return (
        <Link to="/note/new/" className='floating__button'>
            <ArrowButton />
        </Link>
    )
}

export default AddButton
