import React from 'react';
import { NumberMain } from './components';
import styled from 'styled-components';

const Color = styled.div`
  background-color: red;
`

const App = () => {
  return (
    <Color>
      <NumberMain />
    </Color>
  );
}

export default App;
