import { useState, useRef } from "react"
import './index.css'

const CountUp = () => {
  const [count, setCount] = useState(0)
  const [isCountChanged, setIsCountChanged] = useState(false)
  const countChangedTimerRef = useRef(null)

  const handleClick = () => {
    setCount(count + 1)
    if(countChangedTimerRef.ref) {
      clearTimeout(countChangedTimerRef.ref)
    }
    setIsCountChanged(true)
    countChangedTimerRef.ref = setTimeout(() => {
      setIsCountChanged(false)
    }, 200)
  };

  return (
    <div>
      <p className={`count ${isCountChanged?'changed' : ''}`}>{count}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default CountUp