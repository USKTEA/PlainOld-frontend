import styled from 'styled-components';
import useOrderItemStore from '../../hooks/useOrderItemStore';
import rgbToHex from '../../utils/rgbToHex';

const Container = styled.div`
  margin-bottom: 1.5em;

  h3 {
    font-size: .8em;
    font-weight: 600;
    margin-bottom: 1em;
  }

  p {
    font-size: .8em;
    font-weight: 400;
  }
`;

const ColorWrapper = styled.ul`
  display: flex;
`;

const Color = styled.button`
  margin-right: .2em;
  height: 1.5em;
  width: 1.5em;
  border: 1px solid ${(props) => (
    props.color === '#ffffff'
      ? '#ddd'
      : props.color)};
  background-color: ${(props) => props.color};
  cursor: pointer;

  span {
    visibility: hidden;
  }
`;

export default function ColorSelection() {
  const orderItemStore = useOrderItemStore();

  const { colors, option } = orderItemStore;

  const handleChangeOption = (value) => {
    console.log(value);
    orderItemStore.setOption({ option: 'color', value });
  };

  return (
    <Container>
      <h3>컬러 *</h3>
      {option.size
        ? (
          <ColorWrapper>
            {colors.map((color) => (
              <li key={color.name}>
                <Color
                  className="color"
                  type="button"
                  name={color.name}
                  color={
                    rgbToHex({ r: color.red, g: color.green, b: color.blue })
                  }
                  onClick={() => handleChangeOption(color.name)}
                >
                  <span>{color.name}</span>
                </Color>
              </li>
            ))}
          </ColorWrapper>
        )
        : <p>사이즈 옵션을 선택해주세요.</p>}
    </Container>
  );
}
