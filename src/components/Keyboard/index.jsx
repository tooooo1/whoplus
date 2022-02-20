import React from 'react';
import * as Styled from './styled';

const Keyboard = ({ className, value, onClick }) => {
  return (
    <Styled.Wrapper className={className} onClick={onClick}>
      {value}
    </Styled.Wrapper>
  );
};

export default Keyboard;