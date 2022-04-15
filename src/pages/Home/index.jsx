/*
[시작 화면]

타이틀과 게임 시작 버튼이 있습니다.
게임 시작 버튼을 누르면 준비 페이지로 navigate합니다.

*/

import { Positioner } from "../../components/Wrapper/styled";
import Button from "../../components/Button";
import * as Styled from "./styled";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { roundReset } from "../../features/roundSlice";
import { powerReset } from "../../features/powerSlice";
import { nicknameReset } from "../../features/nicknameSlice";
import { timeReset } from "../../features/timeSlice";

const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(roundReset());
    dispatch(powerReset());
    dispatch(nicknameReset());
    dispatch(timeReset());
    navigate("/ready");
  };

  return (
    <Positioner>
      <Styled.GlobalStyle />
      <Styled.Title>누가 더쎔?</Styled.Title>
      <Button color="#ff2e35" onClick={() => onClick()}>
        게임시작
      </Button>
    </Positioner>
  );
};

export default Home;
