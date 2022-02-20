import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 0;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;
    background: #4b89dc;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 12px;
    cursor: pointer;
    user-select: none;
    transition: .3s all;
    &:hover, &:active {
        background: #4b10f2;
    }
`;

const AgainButton = ({children, onClick, ...rest}) => (
    <Wrapper onClick={onClick}>
        {children}
    </Wrapper>
);

export default AgainButton;