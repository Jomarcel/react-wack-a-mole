import { useEffect, useState } from 'react';
import './App.css';

const NUM_ROWS = 3;
const NUM_COLUMNS = 3;

const App = () => {
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState<boolean[][]>(
    new Array(NUM_ROWS)
      .fill(false)
      .map(() => new Array(NUM_COLUMNS).fill(false))
  )

  const wackMole = (rowIndex: number, columnIndex: number) => {
    if (!grid[rowIndex][columnIndex]) return;
    const newMoles = [...grid];
    newMoles[rowIndex][columnIndex] = false;
    setGrid(newMoles);
    setScore((prevScore) => prevScore + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const numRows = grid.length;
      const numCols = grid[0].length;
      const randomColumnIndex = Math.floor(Math.random() * numCols)
      const randomRowIndex = Math.floor(Math.random() * numRows)

      setGrid((prevGrid) => {
        const newMoles = [...prevGrid];
        newMoles[randomRowIndex][randomColumnIndex] = true;
        return newMoles;
      });

      setTimeout(() => {
        setGrid((prevGrid) => {
          if (!prevGrid[randomRowIndex][randomColumnIndex]) return prevGrid;
          const newMoles = [...prevGrid];
          newMoles[randomRowIndex][randomColumnIndex] = false;
          return newMoles;
        });
      }, 900)
    }, 1000)

    return () => clearInterval(interval)
  }, [grid])

  return (
    <div className="App">
      <div className='header'>Score: {score}</div>
      <div className='grid'>
        {grid.map((row, rowIdx) =>
          <div key={rowIdx} className='row'>{row.map((_column, columnIdx) =>
            <div key={columnIdx}>
              <img
                onClick={() => wackMole(rowIdx, columnIdx)}
                alt=''
                src={`${process.env.PUBLIC_URL}${grid[rowIdx][columnIdx] ? '/images/mole.png' : '/images/hole.png'}`}>
              </img>
            </div>)
          }
          </div>)}
      </div>
    </div>
  );
}

export default App;
