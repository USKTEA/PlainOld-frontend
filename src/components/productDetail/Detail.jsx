import styled from 'styled-components';
import useProductStore from '../../hooks/useProductStore';

const Container = styled.section`
  min-height: 30em;
  width: 100%;
  margin-top: 2em;
  margin-bottom: 3em;
`;

const Wrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  li {
    margin-bottom: 1em;
  }
`;

export default function Detail({ setRef }) {
  const { product } = useProductStore();

  const { name, image: { productImageUrls }, description } = product;

  return (
    <Container
      ref={(element) => { setRef(element)('Detail'); }}
    >
      <Wrapper>
        {productImageUrls.map((url) => (
          <li key={url}>
            <img
              src={url}
              alt={name}
              height={600}
              width={500}
            />
          </li>
        ))}
      </Wrapper>

      {description.detail}
    </Container>
  );
}
