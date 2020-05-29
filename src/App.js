import React from 'react';
import styled from 'styled-components';

import Grid from './grid/grid'
import Header from './header/header';

const Appy =styled.div`
  background-color: lavender;
  height: 100vh;
  text-align: center;
  height: 100vh;
`


function App() {
  return (
    <Appy>
      <Header />
      <Grid />
    </Appy>
  );
}

export default App;
