import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useOrderItemStore from '../../hooks/useOrderItemStore';

import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
  width: 100%;
  margin-bottom: 1em;

  h3 {
    font-size: .8em;
    font-weight: 600;
    margin-bottom: .5em;
  }
`;

const Select = styled.select`
  width: 100%;
  font-size: .9em;
  height: 2.5em;
  padding-left: .5em;
  border: 1px solid ${defaultTheme.colors.fourth};
  color: ${defaultTheme.colors.primary};

  :hover {
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

export default function SizeSelection() {
  const orderItemStore = useOrderItemStore();
  const selectRef = useRef(null);

  const { sizes, option } = orderItemStore;

  const handleChangeOption = (value) => {
    orderItemStore.setOption({ option: 'size', value });
  };

  useEffect(() => {
    selectRef.current.value = '';
  }, [orderItemStore.orderItems]);

  return (
    <Container>
      <h3>사이즈  *</h3>
      <Select
        ref={selectRef}
        onChange={(e) => handleChangeOption(e.target.value)}
      >
        {option.size
          ? null
          : <option value="">Size</option>}
        {sizes.map((size) => (
          <option
            key={size}
            value={size}
          >
            {size}
          </option>
        ))}
      </Select>
    </Container>
  );
}
