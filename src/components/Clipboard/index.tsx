import clsx from "clsx";
import { useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import styled from "styled-components";

const CopyAndPaste = styled.span`
  cursor: pointer;
  &.button {
    display: flex;
    &.center {
      align-self: center;
    }    
    justify-content: center;
    font-size: 0.875rem;
    padding: 12px;
    margin: 14px;
    width: 100%;
    max-width: 100%;
    word-break: keep-all;
    border: 1px solid;
    border-radius: 8px;
    background-color: ${props => props.theme.light_green};
    color: ${props => props.theme.white};
    box-shadow: inset 0 3px 6px rgba(176, 176, 176, 0.16), 0 4px 6px rgba(200, 200, 200, 0.45);
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
  className?: string;
  isButton?: boolean;
}

export const Clipboard: React.FC<ClipboardProps> = ({
  content,
  label,
  className,
  isButton = false
}) => {
  const [icon, setIcon] = useState<boolean>(false);

  function addValueInClipboard() {
    navigator.clipboard.writeText(content)
    setIcon(true);

    setInterval(() => {
      setIcon(false)
    }, 3000);
  };

  return (
    <CopyAndPaste
      className={clsx({ button: isButton }, className)}
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