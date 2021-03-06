/*
[게임 모드 설정]

치매 예방 or 두뇌 회전
차이점 : 시간

모드를 설정하면 바로 플레이 화면으로 navigate

*/

import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Positioner } from "../../components/Wrapper/styled";
import Button from "../../components/Button";
import * as Styled from "./styled";
import { roundReset } from "../../features/roundSlice";
import { powerReset } from "../../features/powerSlice";
import { timeReset, setValue, setPlus } from "../../features/timeSlice";

const Mode = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const reset = () => {
    dispatch(roundReset());
    dispatch(powerReset());
    dispatch(timeReset());
  };

  const DementiaVersion = () => {
    reset();

    dispatch(setValue(4));
    dispatch(setPlus(4));

    navigate("/play");
  };

  const BrainVersion = () => {
    reset();

    dispatch(setValue(2));
    dispatch(setPlus(2));

    navigate("/play");
  };

  return (
    <Positioner>
      <Styled.GlobalStyle />
      <Styled.Wrapper>
        <Styled.Img>
          <img src="img/options.png" alt="options" width={50} />
        </Styled.Img>
        <Styled.Title>게임 모드</Styled.Title>

        <Styled.Text>모드 선택에 따라 제한시간이 다릅니다.</Styled.Text>
        <Styled.Text>난이도는 동일합니다.</Styled.Text>
        <Styled.Ex id="last"> 치매 예방 : 5초 </Styled.Ex>
        <Styled.Ex id="last"> 두뇌 회전 : 3초 </Styled.Ex>
        <Styled.InputWrapper>
          <Button color="#ff2e35" id="list" onClick={DementiaVersion}>
            치매 예방
          </Button>
          <Button color="#01a8ff" id="list" onClick={BrainVersion}>
            두뇌 회전
          </Button>
        </Styled.InputWrapper>
      </Styled.Wrapper>
    </Positioner>
  );
};

export default Mode;
