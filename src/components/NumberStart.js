import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const SubMissionInput = styled.input`
    opacity: 0.6;
    border-radius: 10px;
    border: none;
    padding: 1rem;
    margin: 1rem 0;
    width: 70%;
    &:focus {
        outline : none;
    }
`;


const NumberMain = () => {
    const inputRef = useRef(null);
    const [nickname, setNickname] = useState('');
    const dispatch = useDispatch();
    <div>
        <SubMissionInput ref={inputRef} value={nickname} onChange={(e)=>setNickname(e.target.value)} />

    </div>
};

export default NumberMain;
