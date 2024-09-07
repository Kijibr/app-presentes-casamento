import React from "react"
import { Checkbox, Container } from "./styles"
import { UseFormRegister } from "react-hook-form";

interface CheckboxProps {
  name: string;
  label: string;
  value?: boolean;
  isReadOnly?: boolean;
  color?: string;
  register?: UseFormRegister<any>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxComponent: React.FC<CheckboxProps> = ({
  label,
  name,
  value,
  color,
  isReadOnly,
  register,
  onChange
}) => {
  return (
    <Container color={color}>
      {register ? (
        <Checkbox
          {...register(name)}
          type="checkbox"
          disabled={isReadOnly}
        />
      ) : (
        <Checkbox
          name={name}
          onChange={onChange}
          type="checkbox"
          checked={value}
          disabled={isReadOnly}
        />
      )}
      <span>
        {label}
      </span>
    </Container>
  )
}