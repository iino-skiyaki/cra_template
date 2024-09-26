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
    }, 400)
  };

  return (
    <div>
      <div className={`countBackground ${isCountChanged?'changed' : ''}`}>
        <p className={`count ${isCountChanged?'changed' : ''}`}>{count}</p>
      </div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default CountUp