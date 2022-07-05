import React from 'react'
import he from 'he'



export default function Question(props){
    
    
    return(
        <>
            <div className='question--card'>{he.decode(props.question)}</div>
            <div className="options--container">
            {props.options.map((answerOption, index) => (
		        props.answer === answerOption ? 
                <button key={index} className='options--card' onClick={props.clickCorrect}>{he.decode(answerOption)}</button> : 
                <button key={index} className='options--card' onClick={props.clickIncorrect}>{he.decode(answerOption)}</button>
	        ))}
            </div>
        </>
    )
}