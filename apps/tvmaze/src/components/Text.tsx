import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-weight: 600;
  margin-right: 0.5rem;
`;

interface SpanProps {
  size: 's' | 'm' | 'l';
  weight: number;
}
const StyledSpan = styled.span<SpanProps>`
  font-weight: ${({ weight }) => weight};
  font-size: ${({ size }) => {
    switch (size) {
      case 's':
        return '0.8rem';
      case 'm':
        return '1rem';
      case 'l':
        return '1.5rem';
    }
  }};
`;

interface Props {
  label?: string;
  size?: 's' | 'm' | 'l';
  className?: string;
  weight?: number;
  children?: ReactNode;
}
const Text: FC<Props> = ({
  children,
  label,
  className,
  size = 'm',
  weight = 400,
}) => {
  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledSpan size={size} className={className} weight={weight}>
        {children}
      </StyledSpan>
    </>
  );
};

export default Text;
