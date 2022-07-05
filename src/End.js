import React from 'react'

export default function End(props){
    return(
        <div className='end--container'>
            <div className='score'>You scored: {props.score}/5</div>
            <button className="btn" onClick={props.click}>Start Over</button>
        </div>
    )
}