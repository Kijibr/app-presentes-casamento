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
  margin-top: 20px;
  margin-bottom: -12px;
  font-size: 1.2rem;
`;

const Input = styled.input`
  padding: 16px;
  width: 40%;

  font-size: 1.6rem;

  border-radius: 16px;
`;


type InputProps = {
  name: string;
  label: string;
  value?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
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