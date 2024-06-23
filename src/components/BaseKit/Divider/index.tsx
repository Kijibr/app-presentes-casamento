import styled from "styled-components"

const DividerLine = styled.p`
  height: 2px;
  width: 94%;
  background-color: ${(props) => props.theme.gray};
  opacity: 80%;
`;

type DividerProps = {
  className?: string;
}

const Divider = ({ className }: DividerProps) => {
  return (
    <DividerLine className={className} />
  )
}

export default Divider