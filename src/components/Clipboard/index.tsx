import clsx from "clsx";
import { useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import styled from "styled-components";

const CopyAndPaste = styled.span`
  cursor: pointer;
  
  &.button {
    font-size: 0.875rem;
    padding: 8px;
    margin: 14px;
    word-break: keep-all;
    border: 1px solid gray;
    border-radius: 8px;
    background-color: ${props => props.theme.green};
    color: ${props => props.theme.white};
    box-shadow: inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45);
  }

  &:hover {
    opacity: 88%;
  }
  max-width: 60vw;

  transition: 0.5s ease-in-out;
  text-align: center;
  
  .copy-icon {
    cursor: pointer;
    margin-right: 8px;
  }
`;

interface ClipboardProps {
  content: string;
  label: string;
  isButton?: boolean;
}

export const Clipboard: React.FC<ClipboardProps> = ({ content, label, isButton = false }) => {
  const [icon, setIcon] = useState<boolean>(false);

  function addValueInClipboard() {
    navigator.clipboard.writeText(content)
    setIcon(true);

    setInterval(() => {
      setIcon(false)
    }, 3000);
  }

  return (
    <CopyAndPaste
      className={clsx({ button: isButton })}
      onClick={addValueInClipboard}
    >
      <span className="copy-icon">
        {icon ?
          <FaCheck />
          :
          <FaRegCopy />
        }
      </span>
      {label}
    </CopyAndPaste>
  )
}