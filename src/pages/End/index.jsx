import React from 'react';
import { useSelector } from 'react-redux';
import { Positioner } from '../../components/Wrapper/styled'
import Button from '../../components/Button'
import * as Styled from './styled';

import {FacebookShareButton, FacebookIcon,TwitterShareButton, TwitterIcon} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const End = () => {
    const round = useSelector((state) => state.round.value);
    const nickname = useSelector((state) => state.nickname.value);
    const power = useSelector((state) => state.power.value);
    const currentUrl = window.location.href;

    return (
        <Positioner>
            <Styled.Title>누가더쎔?</Styled.Title>
            <Styled.Round> ROUND <Styled.Color>{round}</Styled.Color> / 50 </Styled.Round>
            <Styled.Text> 닉네임 : {nickname} </Styled.Text>
            <Styled.Text> 전투력 : {power} </Styled.Text>
            
            <Button color="#ff2e35" onClick={() => window.location.replace("/")}>다시하기</Button>
            <Styled.GridContainer>
				<FacebookShareButton url={currentUrl}>
					<FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
				</FacebookShareButton>
				<TwitterShareButton url={currentUrl}>
					<TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
				</TwitterShareButton>
				<CopyToClipboard text={currentUrl}>
					<Styled.URLShareButton>URL</Styled.URLShareButton>
				</CopyToClipboard>
				{/* <button>kakao</button> */}
			</Styled.GridContainer>
        </Positioner>
    )
};

export default End;