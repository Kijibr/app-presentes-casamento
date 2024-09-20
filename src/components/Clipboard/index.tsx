import { useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa";

interface ClipboardProps {
  content: string;
}

export const Clipboard: React.FC<ClipboardProps> = ({ content }) => {
  const [icon, setIcon] = useState<boolean>(false);

  function addValueInClipboard() {
    navigator.clipboard.writeText(content)
    setIcon(true);

    setInterval(() => {
      setIcon(false)
    }, 3000);
  }

  return (
    <span className="copy-icon">
      {icon ?
        <FaCheck />
        :
        <FaRegCopy onClick={addValueInClipboard} />
      }
    </span>
  )
}