import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    margin-bottom: 2rem;
    font-size : 1.5rem;
    font-weight : 1000;
    margin-bottom : 3rem;
    text-align: center;
`

const NumberContent = ({children}) => (
    <Content>
        {children}
    </Content>
)

export default NumberContent;