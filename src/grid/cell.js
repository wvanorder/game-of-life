import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';

const Cell = props => {
    return(
        <div
            key ={`${props.i}-${props.j}`}
            onClick={() => {
            const newGrid = produce(props.grid, grid2 => {
                grid2[props.i][props.j] = props.grid[props.i][props.j] ? 0 : 1;
            })
            props.setGrid(newGrid) 
            }}
            style={{ width: 20,
            height: 20, backgroundColor: props.grid[props.i][props.j] ? "tomato" : undefined, 
            border: "1px solid black"}}>
        </div>
    )
}

export default Cell;