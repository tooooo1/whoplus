import { Positioner } from '../../components/Wrapper/styled'
import Button from '../../components/Button'
import * as Styled from './styled';
import { useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate();

    return (
        <Positioner>
            <Styled.Title>누가 더쎔?</Styled.Title>
            <Button color="#ff2e35" onClick={() => navigate("/ready")}>게임시작</Button>
        </Positioner>
    )
};

export default Home;
