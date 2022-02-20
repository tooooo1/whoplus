import styled from 'styled-components';

export const Round = styled.div`
    padding: 1vh;
    font-weight: initial;
    font-size: 3vh;
    font-family: "Pretendard-SemiBold";
    text-align: center;
`;

export const URLShareButton = styled.button`
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

export const Color = styled.span`
    color: #1bb749;
`

export const Title = styled.div`
    font-size : 10vh;
    font-weight : 1000;
    margin : 2rem 0;
    text-align: center;
    font-family: "Pretendard-Black";
`;

export const Text = styled.div`
    font-size : 3vw;
    margin-bottom : 5vh;
    text-align: center;
    font-family: "Pretendard-SemiBold";
`;

export const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 48px);
	grid-column-gap: 8px;
	justify-content: center;
	align-items: center;
	margin: 5vw 0;
`;