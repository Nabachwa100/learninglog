import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h1>React Counter</h1>

      <p className="count">{count}</p>

      {count === 10 && (
        <p className="message">
          🎉 Congratulations! You reached 10!
        </p>
      )}

      <div className="buttons">
        <button onClick={() => setCount(count + 1)}>
          Increase
        </button>

        <button onClick={() => setCount(count - 1)}>
          Decrease
        </button>

        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;