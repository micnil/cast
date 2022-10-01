import styled, { css } from 'styled-components';

const errorStyle = css`
  color: #d8000c;
  background-color: #ffbaba;
`;

const warningStyle = css`
  color: #9f6000;
  background-color: #feefb3;
`;

const infoStyle = css`
  color: #31708f;
  background-color: #d9edf7;
`;
interface Props {
  type: 'error' | 'warning' | 'info';
}

const Message = styled.div<Props>`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin: 1rem auto;
  padding: 2rem;
  ${({ type }) => {
    switch (type) {
      case 'error':
        return errorStyle;
      case 'warning':
        return warningStyle;
      case 'info':
        return infoStyle;
    }
  }};
`;

export default Message;
