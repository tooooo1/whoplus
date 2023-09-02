import styled from '@emotion/styled';

const Logo = () => (
  <a
    href="https://tooo1.tistory.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="tooo1 Blog"
  >
    <StyledImg
      src="images/il.jpg"
      alt="tooo1 Blog Logo"
      width={50}
      height={50}
    />
  </a>
);

export default Logo;

const StyledImg = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  border-radius: 100px;
`;
