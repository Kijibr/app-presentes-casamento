import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  body{
    margin: 0;
    padding: 0;
    max-width: 100vw;
    min-height: 100vh;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 62.5%;
  } 
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

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