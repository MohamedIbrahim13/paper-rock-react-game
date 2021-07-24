import { useState, useReducer, useEffect } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"

const initialState = {
  isLoading: false,
}
const choices = [
  { choice: "paper", className: "paper_hand" },
  { choice: "rock", className: "rock_hand" },
  { choice: "scissors", className: "scissors_hand" },
]
const generateComputerChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)].choice
  //setComputerChoice(randomChoice)
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_PLAYED":
      return {
        ...state,
        isLoading: true,
        userChoice: action.payload,
        computerChoice: generateComputerChoice(),
      }
    case "RESET":
      return { ...state, isLoading: false }
    default:
      return state
  }
}

const useScore = () => {
  const [score, setScore] = useState(localStorage.getItem("score") || 0)
  useEffect(() => {
    localStorage.setItem("score", score)
  }, [score])
  return [parseInt(score), setScore]
}

export default function App() {
  const [score, setScore] = useScore()
  const [result, setResult] = useState(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isLoading, userChoice, computerChoice } = state

  const resetScore = () => setScore(0)

  const handlePlay = id => {
    dispatch({
      type: "USER_PLAYED",
      payload: choices[id].choice,
    })
  }
  const handleReset = () => {
    dispatch({
      type: "RESET",
    })
  }

  useEffect(() => {
    switch (userChoice + computerChoice) {
      case "scissorspaper":
      case "rockscissors":
      case "paperrock":
        setScore(score => score + 1)
        setResult(true)

        break
      case "paperscissors":
      case "scissorsrock":
      case "rockpaper":
        setScore(score => score - 1)
        setResult(false)

        break
      case "rockrock":
      case "paperpaper":
      case "scissorsscissors":
        setResult(null)

        break
    }
  }, [computerChoice, userChoice, setScore])
  //console.log('state',state)
  return (
    <div className="App">
      <Header score={score} />
      <main>
        {choices.map((obj, index) => (
          <button
            key={index}
            id={index}
            onClick={e => handlePlay(e.target.id)}
            className={`${obj.className} hand`}
          ></button>
        ))}
        <div className="clearfix"></div>
        <div className="winlose">
          <p>
            {result
              ? "YOU WIN!"
              : result === null
              ? "ITS A DRAW!"
              : "YOU LOSE!"}
          </p>
          <button onClick={handleReset}>Play again</button>
        </div>
      </main>

      <Footer resetScore={resetScore} />
    </div>
  )
}
