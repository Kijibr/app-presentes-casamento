import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const StyledButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  ${({ variant, theme }) =>
    variant === 'primary'
      ? css`
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${theme.colors.primaryDark};
    }
    `
      : css`
    background-color: transparent;
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.primary};
    
    &:hover {
      background-color: ${theme.colors.primaryLight};
      color: ${theme.colors.primaryLight};
    }
    `}
`;

export const ButtonComponent: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};