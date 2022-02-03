import React from 'react';
import styled from 'styled-components';

const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Contents = styled.div`
    background: rgba(255,255,255,0.4);
    padding: 3rem 10rem;
    height: auto;
    border-radius: 12px;
`;

const Title = styled.div`
    font-size : 1.5rem;
    font-weight : 1000;
    margin-bottom : 3rem;
    text-align: center;
`

const NumberWrapper = ({ title, children }) => (
    <Positioner>
        <Title>{title}</Title>
        <Contents>
            {children}
        </Contents>
    </Positioner>
);

export default NumberWrapper;