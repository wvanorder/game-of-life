import React, {useState, useCallback, useRef} from 'react';
import styled from 'styled-components';


import Cell from './cell'

function Grid() {
    //make this dynamic piece of state later to allow user to choose dimensions
    let dimensions = 25

    //initialize array matrix of 0s
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for(let i = 0; i < dimensions; i ++) {
            //all the 0s
            rows.push(Array.from(Array(dimensions), () => 0))
        }

        return rows
    });
    const [running, setRunning] = useState(false);

    //don't worry about most recent state thanks to useRef
    const runningRef = useRef();
    runningRef.current = running

    const runGame = useCallback(() => {
        //check to see if it is running
        if(!runningRef.current) {
            return;
        }
        
        //call itself every one second to see if it is still running
        setTimeout(runGame, 1000);
    }, [])

    console.log(grid)

    return (
    <>
        <button>start</button>
        <button>stop</button>
        <button>clear</button>
        <div style={{
            display: 'grid',
            //n = dimensions of columns, each 20px wide
            gridTemplateColumns: `repeat(${dimensions}, 20px)`
        }}>
            {grid.map((rows, i) => rows.map((column, j) => (
                <Cell 
                    grid={grid}
                    i={i}
                    j={j}
                    setGrid={setGrid}    
                />)))}
        </div>
    </>

    );
  }
  
  export default Grid;