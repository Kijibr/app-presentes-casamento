import { createGlobalStyle } from "styled-components";
import { mediaQueryUp } from "./breakPoints";

export const maxWidth = `${window.screen.availHeight}px`;
export const maxHeight = `${window.screen.availWidth}px`;

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
  }

  body{
    font-family: "Asap Condensed", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 62.5%;
    background: ${props => props.theme.light_white};
  } 

  ${mediaQueryUp.sm} {
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
  };

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  input:focus{
    outline: none !important;
  }
`;