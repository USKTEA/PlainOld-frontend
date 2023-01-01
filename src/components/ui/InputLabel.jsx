import styled from 'styled-components';

const InputLabel = styled.label`
  font-size: .8em;
  display: flex;
  align-items: center;

  input {
    position: relative;
    margin-right: .5em;
    margin-left: 0;
    margin-top: 0;
    cursor: pointer;
  }

  label {
    text-align: center;
    margin-bottom: 0;
    cursor: pointer;
  }

  cursor: pointer;
`;

export default InputLabel;
