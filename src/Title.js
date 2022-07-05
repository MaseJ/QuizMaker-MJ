import React from 'react'

export default function Title(props){
    return (
        <div className='title--container'>
            <h1 className='neon--text'>Quiz Maker 5000</h1>
            <h3>By: Mason Johnson</h3>
            <p className='description'>Welcome to my game. This game is a work in process. Most of the heavy lifting is done so the application is usable.
                The questions being used are from Open Trivia Database. The questions are random in difficulty and category.
                Currently no loading screen is implemented when grabbing each question so when you click an answer
                the page may take a second to load at times. In the future I plan to add a loading screen to not confuse the user and
                also, an option to select difficulty and the category. Until now enjoy:)
            </p>
            <button className="btn" onClick={props.click}>Start</button>
        </div>
    )
}