import styled from "styled-components";

export const LeftSection = (props) => {
  return (
    <Container>
      <div className="round-1"></div>
      <div className="round-2"></div>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  position: relative;
  border-top-right-radius: 200px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px);

  .round-1 {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(24px);
    border-radius: 50%;
    width: 200px;
    height: 200px;
    position: absolute;
    top: 10%;
    right: 10%;
    &:before {
      content: "";
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(24px);
      position: absolute;
      border-radius: 50%;
      bottom: 12%;
      left: -29%;
    }
    &:after {
      content: "";
      width: 30px;
      height: 30px;
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(24px);
      position: absolute;
      border-radius: 50%;
      bottom: -25%;
      left: 29%;
    }
  }
  .round-2 {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(24px);
    border-radius: 50%;
    width: 200px;
    height: 200px;
    position: absolute;
    bottom: -10%;
    left: -50px;
    &:before {
      content: "";
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(24px);
      position: absolute;
      border-radius: 50%;
      top: 12%;
      right: -29%;
    }
    &:after {
      content: "";
      width: 30px;
      height: 30px;
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(24px);
      position: absolute;
      border-radius: 50%;
      top: -25%;
      right: 29%;
    }
  }
`;
