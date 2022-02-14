import React from 'react';
import { NumberWrapper, AgainButton } from '../components';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {FacebookShareButton, FacebookIcon,TwitterShareButton, TwitterIcon} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const SubMissionRound = styled.div`
    padding: 2rem 0;
    font-weight: initial;
    font-size: 1.2rem;
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 48px);
	grid-column-gap: 8px;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
`;

const URLShareButton = styled.button`
	width: 48px;
	height: 48px;
	color: white;
	border-radius: 24px;
	border: 0px;
    font-family: "Pretendard-Medium";
	font-weight: 800;
	font-size: 18px;
	cursor: pointer;
	background-color: #666666;
`;

const NumberEnd = () => {
    const round = useSelector((state) => state.round.value);
    const nickname = useSelector((state) => state.nickname.value);
    const currentUrl = window.location.href;

    return (
        <NumberWrapper>
            <SubMissionRound> ROUND {round} / 50 <p></p>닉네임 : {nickname} <p></p> {round}개? ㅋㅋ</SubMissionRound>
            
            
            <AgainButton onClick={()=>window.location.replace("/")}>다시하기</AgainButton>
            <div style={{ margin: "20px" }}> 공유하기 </div>
            <GridContainer>
				<FacebookShareButton url={currentUrl}>
					<FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
				</FacebookShareButton>
				<TwitterShareButton url={currentUrl}>
					<TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
				</TwitterShareButton>
				<CopyToClipboard text={currentUrl}>
					<URLShareButton>URL</URLShareButton>
				</CopyToClipboard>
				{/* <button>kakao</button> */}
			</GridContainer>
        </NumberWrapper>
)
};

export default NumberEnd;
