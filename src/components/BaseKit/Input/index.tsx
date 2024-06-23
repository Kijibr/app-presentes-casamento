import React, {  } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  gap: 24px;
  width: 100%;
`;

const Label = styled.span`
  margin-bottom: -24px;
  font-size: 1.125rem;
  align-self: flex-start;
`;

const Input = styled.input`
  padding: 8px 24px;

  font-size: 0.875rem;
  border: 1px solid gray;

  border-radius: 4px;
`;

type InputProps = {
  name: string;
  label: string;
  value?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  register: UseFormRegister<any>;
}

export const InputComponent: React.FC<InputProps> = ({
  name,
  label,
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
        type='text'
        value={value}
      />
    </Container>
  )
};