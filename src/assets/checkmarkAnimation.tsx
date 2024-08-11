import React from 'react';
import styled, { keyframes } from 'styled-components';

const Checkmark = styled.svg`
  width: 124px;
  height: 124px;
  stroke-width: 2px;
  stroke: #4caf50;
  fill: ${props => props.theme.white};
  margin: 8px;
`;

const strokeAnimation = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const CheckmarkCircle = styled.circle`
  stroke-dasharray: 216;
  stroke-dashoffset: 166;
  stroke-width: 4;
  stroke-miterlimit: 20;
  stroke: #4caf50;
  fill: none;
  animation: ${strokeAnimation} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

const CheckmarkCheck = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: ${strokeAnimation} 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
`;

const CheckmarkAnimation = () => {
  return (
    <Checkmark
      className="checkmark"
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70"
    >
      <CheckmarkCircle
        className="checkmark__circle"
        cx="36" cy="36" r="32" 
        fill="none"
      />
      <CheckmarkCheck
        className="checkmark__check" fill="none" d="M20 35.4l9 9.2 21-21.2"
      />
    </Checkmark>
  );
};

export default CheckmarkAnimation;
