const { useState } = require("react");

const CountUp = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1)
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default CountUp