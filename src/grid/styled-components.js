import styled from 'styled-components';

export const  ButtonHolder = styled.div`
    width: 80%;
    max-width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 5px;
`

export const Column = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 500px;
    button{
        border-radius: 8px;
        width: auto;
        font-size: 1.2rem;
        border: 2px solid #008CBA;
        margin-bottom: 5px;
        background: white;
        &:hover{
            transition-duration: 0.4s;
            background: #008CBA;
            color: white;
        }
    }
`

export const ColumnHolder = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
`