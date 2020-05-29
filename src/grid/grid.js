import React, {useState, useCallback, useRef} from 'react';


import Cell from './cell'
import possibleNeighbors from './neighborsArray'
import produce from 'immer';

import {ButtonHolder,Column, ColumnHolder} from './styled-components'
import styled from 'styled-components';



//all the possible indexes of neighbors, relative to the current position in the matrix

var generation = 0;

const Grid = () => {
    //make this dynamic piece of state later to allow user to choose dimensions
    const [dimensions, setDimensions] = useState({height: 25, width: 25});

    const handleChange = e => {
        e.preventDefault();
        setDimensions({
            ...dimensions,
            height: parseInt(e.target.value),
        })
    };

    //function for setting grid since I use it all over the place
    const gridSet = cellValue => {
        const rows = [];
        for(let i = 0; i < dimensions.height; i ++) {
            //all the 0s
            rows.push(Array.from(Array(dimensions.width), () => cellValue))
        }

        return rows
    }
    const updateDimensions = (e) => {
        e.preventDefault();
        setGrid(gridSet(0))
    };

    const generationStep = () => {
        generation += 1;
        setGrid((grid) => {
            return produce(grid, grid2 => {
                //going through every row
                for(let i = 0; i < dimensions.height; i++){
                    //going through every column in each row 
                    for(let j = 0; j < dimensions.width; j++){
                        let neighbors = 0;
                        //run through each possible neighbor of any index
                        possibleNeighbors.forEach(([x,y]) => {
                            //'new' x,y coordinates for each possible neighbor
                            const neighborI = i + x;
                            const neighborJ = j + y;
                            //check to see if that neighboring index lies within our matrix's parameters
                            if(neighborI >= 0 && neighborI < dimensions.height && neighborJ >= 0 && neighborJ < dimensions.width){
                                //add the value of the neighbor to the sum of neighbors
                                neighbors += grid[neighborI][neighborJ]
                            }
                        })

                        if(neighbors < 2 || neighbors > 3) {
                            grid2[i][j] = 0;
                        } else if(grid[i][j] === 0 && neighbors === 3) {
                            grid2[i][j] = 1;
                        }
                    }
                }
            });
        })
    }

    //initialize array matrix of 0s
    const [grid, setGrid] = useState(gridSet(0));
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(1000)
    

    //don't worry about most recent state thanks to useRef
    const runningRef = useRef();
    runningRef.current = running;

    const speedRef = useRef();
    speedRef.current = speed

    const runGame = useCallback(() => {
        //check to see if it is running
        if(!runningRef.current) {
            return;
        }
        generationStep()

        
        //call itself every one second to see if it is still running
        setTimeout(runGame, speedRef.current);
    }, [])

    const randomize = () => {
        if(running) {
            return;
        }
        setGrid(() => {
            const rows = [];
            for(let i = 0; i < dimensions.height; i ++) {
                //all the 0s
                rows.push(Array.from(Array(dimensions.width), () => Math.random() > 0.5 ? 1: 0))
            }
    
            return rows
        
        })
    }

    return (
    <ColumnHolder>
        <Column>
            <ButtonHolder>
                <form onSubmit={e => updateDimensions(e)}>
                        <label>Height: </label>
                        <input
                            type="number"
                            min="1"
                            placeholder="height"
                            name="height"
                            value={dimensions.height}
                            onChange={handleChange}
                        />
                </form>
                <button onClick={e => updateDimensions(e)}>Update</button>
            </ButtonHolder>
            <ButtonHolder>
                <button
                    onClick={() => {
                        setRunning(true);
                        runningRef.current = true;
                        runGame();
                    }}
                >
                    Start
                </button>
                <button
                    onClick={() => {
                        setRunning(false);
                        runningRef.current = false;
                    }}
                >
                    Stop
                </button>
                <button
                    onClick={() => {
                        generation = 0;
                        setRunning(false);
                        setGrid(gridSet(0))
                    }}
                >
                    clear
                </button>
            </ButtonHolder>
            <ButtonHolder>
                <button onClick={() => setSpeed(1500)}>Slow</button>            
                <button onClick={() => setSpeed(1000)}>Normal Speed</button>
                <button onClick={() => setSpeed(500)}>Fast</button>
            </ButtonHolder>
            <button onClick={() => randomize()}> Random Pattern </button>
            <div style={{
                display: 'grid',
                //n = dimensions of columns, each 20px wide
                gridTemplateColumns: `repeat(${dimensions.width}, 20px)`
            }}>
                {grid.map((rows, i) => rows.map((column, j) => (
                    <Cell
                        running={running} 
                        grid={grid}
                        i={i}
                        j={j}
                        setGrid={setGrid}    
                    />)))}
            </div>
            <div>
            Days of Quarantine: {generation}
            </div>
            <button onClick={() => generationStep()}>move forward one generation</button>
        </Column>
        <Column>
            <h2>The Rules</h2>
            <p>You are responsible the community of cells on your left. Because of a recent global pandemic, certain "cell-distancing" policies have been put in place to protect the community. They are as follows:
            <ol>
                <li>Any cell with fewer than two neighbors dies of isolation</li>
                <li>Any cell with more than three neighbors dies of overpopulation (keep your social distance!)</li>
                <li>any currently dead cell with exactly three living neighbors will become living in the next turn (the power of positivity!)</li>
            </ol>
            </p>
        </Column>
    </ColumnHolder>
    );
  }
  
  export default Grid;