import React, { FC } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  display: flex;
  width: 100%;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  padding: 0.5rem 0.8rem;
  font-size: 1rem;

  :focus {
    outline: none;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    border-color: rgba(223, 225, 229, 0);
  }
`;

type Props = React.InputHTMLAttributes<HTMLInputElement>

const TextInput: FC<Props> = (props) => {
  return <StyledInput type='text' {...props}></StyledInput>;
};

export default TextInput;
