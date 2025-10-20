import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  as?: 'input' | 'textarea';
  name?: string;
  type?: string;
  value?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  register?: UseFormRegister<any>;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 12px;
  border: 1px solid ${({ theme, hasError }) =>
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  padding: 12px;
  border: 1px solid ${({ theme, hasError }) =>
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 12px;
`;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  as = 'input',
  ...props
}) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      {as === 'textarea' ? (
        <StyledTextArea hasError={!!error} {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>} />
      ) : (
        <StyledInput hasError={!!error} {...props as React.InputHTMLAttributes<HTMLInputElement>} />
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};