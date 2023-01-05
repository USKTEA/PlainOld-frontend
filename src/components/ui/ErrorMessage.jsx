import styled from 'styled-components';

const ErrorMessage = styled.p`
  margin-bottom: .5em;
  font-size: .7em;
  color: ${((props) => props.theme.colors.red)};
`;

export default ErrorMessage;
