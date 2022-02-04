import React from 'react';
import styled from 'styled-components';

const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Contents = styled.div`
    background: rgba(0,0,0,0.1);
    padding: 3rem 10rem;
    height: auto;
    border-radius: 12px;
    border : 0.001rem solid black;
`;

const Title = styled.div`
    font-size : 1.5rem;
    font-weight : 1000;
    margin-bottom : 3rem;
    text-align: center;
`;

const NumberWrapper = ({ children }) => (
    <Positioner>
        <Title>숫자 게임</Title>
        <Contents>
            {children}
        </Contents>
    </Positioner>
);

export default NumberWrapper;