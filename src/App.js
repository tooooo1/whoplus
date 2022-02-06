import React from 'react';
import { NumberMain, NumberEnd } from './components';
import styled from 'styled-components';

const Color = styled.div`
  background-color: red;
`

const App = () => {
  return (
    <Color>
      <NumberMain />
      {/* <NumberEnd /> */}
    </Color>
  );
}

export default App;
