import {useState} from "react"
//passes initial mode, sets the mode state with initial provided, returns object mode
const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
// lets the transition go to a new mode
  const transition = (newMode, replace = false) => {
    setHistory(prevHistory => replace ? [...prevHistory.slice(0, prevHistory.length-1), newMode] :[...prevHistory, newMode])
    setMode(newMode)
  }
  //call back, then returns to previous mode
  const back = () => {
    if(history.length < 2) return
    setHistory(prevHistory => prevHistory.slice(0, -1))
    setMode(history[history.length -2])
  }
  return {mode, transition, back }
}
export default useVisualMode;