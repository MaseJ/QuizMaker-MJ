import React from "react"
import './App.css';
import data from './Data'
import { useId } from 'react'
import he from 'he'
/*
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import Title from './Title'
*/
import Question from "./Question";
import Title from "./Title"
import End from "./End"

export default function App(){



// State
  const [score, setScore] = React.useState(0)
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [gameStatus, setGameStatus] = React.useState(0)
  const [quiz, setQuiz] = React.useState([])

  


  // useEffect
  React.useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=5&type=multiple"

    const fetchData = async () => {
      try{
        const response = await fetch(url)
        const json = await response.json()
        
        const newArray = []
        
        if(currentQuestion < 5){
          setQuiz((prevQuiz) => [
            {
              id: currentQuestion,
              question: he.decode(json.results[currentQuestion].question),
              correctAnswer: json.results[currentQuestion].correct_answer,
              incorrectAnswers: json.results[currentQuestion].incorrect_answers,
              options: insertOptions(json.results[currentQuestion].incorrect_answers, json.results[currentQuestion].correct_answer)
            }
          ]) 
      }
        
      } catch (error){
        console.log("error", error)
      }
    }
    
    fetchData()
  },[currentQuestion]) 


 


  // Function to add correct answer and incorrect answer into options
  function insertOptions(wrong, correct){
    
    const correctIndex = Math.floor(Math.random() * 4)
    
    wrong.splice(correctIndex, 0, correct)

    
    
    return wrong 
  }

  function handleIncorrect(){
    console.log("wrong")
    setCurrentQuestion(prevQuestion => prevQuestion + 1)
    if(currentQuestion == 4){
      setGameStatus(3)
    }
  }

  function handleCorrect(){
    console.log("correct")
    setScore(prevScore => prevScore + 1)
    setCurrentQuestion(prevQuestion => prevQuestion + 1)
    if(currentQuestion == 4){
      setGameStatus(3)
    }
    
  }

  function startGame(){
    setGameStatus(1)
  }

  function startGameOver(){
    setGameStatus(0)
    setCurrentQuestion(0)
    setScore(0)
  }

  // Map Question component
  const questions = quiz.map(q => {
    return (
      <Question 
        key={q.id}
        id={q.id}
        question={q.question}
        answer={q.correctAnswer}
        wrongAnswers={q.incorrectAnswers}
        options={q.options}
        clickIncorrect={handleIncorrect}
        clickCorrect={handleCorrect}
        />
    )
  })
  

  // Render
  return(
    <div className="game--container">
        {
          gameStatus == 0 && <Title click={startGame}/>
        }

        {
          currentQuestion < 5  && gameStatus == 1 ?
          <div className="question--container">
            {questions}
          </div> :
          gameStatus == 3 ? 
          <End click={startGameOver} score={score}/> : ""
        }   
        

    </div>
  )
}
