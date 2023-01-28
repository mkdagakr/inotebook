import React from 'react'
import AddNote from './AddNote';
import Note from './Note'

const Home = () => {

    return (
        <>
            <div className='container'>

                <div className="my-3">
                    <h1>Add New Note</h1>
                    <AddNote />
                </div>

                <div className='my-3'>
                    <h2>Your Notes</h2>
                    <Note />
                </div>

            </div>
        </>
    )
}

export default Home;