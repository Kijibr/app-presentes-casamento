import styled from "styled-components";

export const Container = styled.label<{ color?: string }>`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 4px;
  cursor: pointer;

  font-size: 12px;
  
  span{
    margin-bottom: 2px;
    color: ${props => props.theme.dark_green};
  }
`;

export const Checkbox = styled.input`
  min-width: 18px;
  min-height: 18px;
  height: 100%;
  accent-color: ${props => props.theme.dark_green};
`;