import React from 'react';
import styled from 'styled-components'


const Heady = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: lavender;

    h1{
        font-size: 2.4rem;
        margin: 0;
        color: mediumaquamarine;
    }
`

const Header = () => {
    return(
        <Heady>
            <h1>
                John Conway's Game of <span style={{color: 'black', textDecoration: 'line-through'}}>
                <span style={{color: 'mediumaquamarine'}}>Life</span>
                </span> Quarantine
            </h1>
        </Heady>
    )
}

export default Header;
