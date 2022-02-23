import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Positioner } from '../../components/Wrapper/styled'
import Button from '../../components/Button'
import * as Styled from './styled';
import { rountReset } from '../../features/roundSlice';
import { powerReset } from '../../features/powerSlice';
import { nicknameReset } from '../../features/nicknameSlice';
import { timeReset } from '../../features/timeSlice';

import {FacebookShareButton, FacebookIcon,TwitterShareButton, TwitterIcon} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const End = () => {
    const round = useSelector((state) => state.round.value);
    const nickname = useSelector((state) => state.nickname.value);
    const power = useSelector((state) => state.power.value);
    const currentUrl = window.location.href;
    const dispatch = useDispatch();

    const comma = power.toLocaleString();
    

    const reset = () => {
        dispatch(rountReset())
        dispatch(powerReset())
        dispatch(nicknameReset())
        dispatch(timeReset())
        window.location.replace("/");
        setTimeout(() => {           
            window.location.replace("/");
        }, 1000);
    }

    return (
        <Positioner>
            <Styled.GlobalStyle />
            <Styled.Wrapper>
                <Styled.Title>누가더쎔?</Styled.Title>
                <Styled.Round> ROUND <Styled.Color>{round}</Styled.Color> / 50 </Styled.Round>
                <Styled.Text> 닉네임 : {nickname} </Styled.Text>
                <Styled.ResultWrapper>
                    <Styled.Power> <div><div><img src="img/boxing-gloves.png" alt='boxing' width={50} /></div><div>  전투력</div> </div><div>  {comma} </div>  </Styled.Power>
                    
                    <Button color="#ff2e35" onClick={() => reset()}>다시하기</Button>
                    <Styled.ShareText>공유하기</Styled.ShareText>
                    <Styled.GridContainer>
                        <FacebookShareButton url={currentUrl}>
                            <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
                        </FacebookShareButton>
                        <TwitterShareButton url={currentUrl}>
                            <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
                        </TwitterShareButton>
                        <Styled.Color>
                            <CopyToClipboard text={currentUrl}>
                                <Styled.URLShareButton onClick={() => alert("복사되었습니다.")}>URL</Styled.URLShareButton>
                            </CopyToClipboard>
                        </Styled.Color>
                        {/* <button>kakao</button> */}
                    </Styled.GridContainer>
                </Styled.ResultWrapper>
            </Styled.Wrapper>
        </Positioner>
    )
};

export default End;