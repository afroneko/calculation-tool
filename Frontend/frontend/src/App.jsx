import { useState } from 'react'
import { useEffect } from "react";
import { getTest } from './services/api';

function App() {
  const [count, setCount] = useState(0)

   useEffect(() => {
    getTest().then(console.log);
  }, []);
  
  return <h1 >Hello React</h1>;
}

export default App;
