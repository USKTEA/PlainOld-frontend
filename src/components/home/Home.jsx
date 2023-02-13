import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
  height: calc(100vh - 20em);
  width: 100%;
  font-size: .7em;
  min-width: 1500px;
  display: flex;
  flex-direction: column;
  width: 1em;
`;

const Banner = styled.div`
  z-index: 1;
  left: 40%;
`;

const Title = styled.h2`
  font-size: 5em;
  font-weight: 900;
  margin-top: .3em;
  margin-left: 2em;
  margin-bottom: .3em;

  color: ${defaultTheme.colors.primaryText};
`;

const CapWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 20em;
    width: 30em;
  }
`;

const ClothWrapper = styled.div`
  height: 15em;
  width: 60%;
  display: flex;
  left: 9em;
  align-items: center;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 25em;
    width: 25em;
  }
`;

const SubWrapper = styled.div`
  display: flex;
`;

const MessageContainer = styled.div`
  font-size: 1.2em;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  p {
    margin-bottom: .2em;
    color: ${defaultTheme.colors.primaryText};
  }

  a {
    font-weight: 300;
    height: 2em;
    margin-top: 2em;
    width: 7em;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${defaultTheme.colors.seventh};
    color: ${defaultTheme.colors.seventh};

    :hover {
      background-color: ${defaultTheme.colors.seventh};
      color: white;
    }
  }
`;

const Dots = styled.div`
  height: 12em;
  width: 100em;
  margin-left: 50em;
  display: flex;
  left: 10em;
  justify-content: end;
  position: relative;
  overflow: hidden;
  z-index: 1;
  bottom: 7em;

  img {
    top: 0;
    left: 0;
    height: 300em;
    width: 190em;
  }
`;

export default function Home() {
  return (
    <Container>
      <Banner>
        <CapWrapper>
          <img src="/assets/images/cap.png" alt="cap" />
        </CapWrapper>
        <Title>Plain Old</Title>
        <SubWrapper>
          <ClothWrapper>
            <img src="/assets/images/cloth.png" alt="cloth" />
          </ClothWrapper>
          <MessageContainer>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
            <p>eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <Link
              to="/products"
            >
              SHOP NOW
            </Link>
          </MessageContainer>
        </SubWrapper>
      </Banner>
      <Dots>
        <img
          src="/assets/images/cloth.png"
          alt="dots"
        />
      </Dots>
    </Container>
  );
}
