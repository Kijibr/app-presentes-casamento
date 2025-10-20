import { memo } from "react"
import { GiftBox, ActionButton } from "./styles";

interface CardProps {
  content: {
    id: string,
    name: string,
    image: string,
  };
  buttonText?: string;
  children?: JSX.Element;
  buttonAction?: () => void;
}

export const CardComponent: React.FC<CardProps> = memo(({ content, buttonText, children, buttonAction }) => {
  const { id, name, image } = content;

  return (
    <GiftBox key={id}>
      <img src={image} alt={'image-' + name} loading="lazy" />
      <p>
        {name}
      </p>
      {children}
      {buttonText && buttonAction && (
        <ActionButton onClick={() => buttonAction!()}>
          {buttonText}
        </ActionButton>
      )}
    </GiftBox>
  );
})