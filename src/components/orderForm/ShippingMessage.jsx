import styled from 'styled-components';

const OPTIONS = [
  { value: '', name: '배송메모를 선택해 주세요.' },
  { value: '배송 전에 미리 연락 바랍니다.', name: '배송 전에 미리 연락 바랍니다.' },
  { value: '부재시 경비실에 맡겨주세요.', name: '부재시 경비실에 맡겨주세요.' },
  { value: '부재시 전화나 문자를 남겨주세요.', name: '부재시 전화나 문자를 남겨주세요.' },
  { value: '직접 입력', name: '직접 입력' },
];

const Select = styled.select`
  width: 100%;
  padding: .7em;
  margin-bottom: .7em;

  :focus {
    outline: none;
  }
`;

function ShippingMessage({ handleChange }) {
  return (
    <Select onChange={(e) => handleChange(e.target.value)}>
      {OPTIONS.map((option) => (
        <option
          key={option.name}
          value={option.value}
        >
          {option.name}
        </option>
      ))}
    </Select>
  );
}

export default ShippingMessage;
