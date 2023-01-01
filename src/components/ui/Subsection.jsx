import styled from 'styled-components';

const SubSection = styled.article`
  margin: 1em;
  margin-right: 0;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  background-color: white;

  label {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    font-size: .9em
  }

  label > input {
    margin-top: 0;
  }
`;

export default SubSection;
