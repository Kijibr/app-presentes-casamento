import React, {  } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  gap: 24px;
  width: 100%;
`;

const Label = styled.span`
  margin-bottom: -24px;
  
  font-size: 0.875rem;
  font-weight: 300;
  
  align-self: flex-start;
`;

const Input = styled.input`
  padding: 8px 6px;
  
  font-size: 0.775rem;
  border: 1px solid ${props => props.theme.gray};
  
  border-radius: 4px;

  &:focus{
    border: 1px solid ${props => props.theme.dark_green};
  }
`;

type InputProps = {
  name: string;
  label: string;
  type?: string;
  value?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  register: UseFormRegister<any>;
}

export const InputComponent: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  value,
  register,
  handleChange
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        {...register(name, {
          onChange: handleChange,
        })}
        type={type}
        value={value}
      />
    </Container>
  )
};