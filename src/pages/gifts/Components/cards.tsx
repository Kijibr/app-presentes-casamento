import { memo } from "react"
import { GiftBox, SendGiftButton } from "../styles";
import { GiftType } from "src/types";
import { formatCurrencyValue } from "src/utils/formatCurrency";

interface GiftCardProps {
  giftContent: GiftType;
  togglePaymentOptions: () => void;
}

export const GiftCard: React.FC<GiftCardProps> = memo(({ giftContent, togglePaymentOptions }) => {
  const { id, giftValue, name, image } = giftContent;
  const giftValueFormatted = formatCurrencyValue(parseFloat(giftValue));

  return (
    <GiftBox key={id}>
      <img src={image} alt={'image-' + name} loading="lazy" />
      <p>
        {name}
      </p>
      <p className="giftValue">
        {giftValueFormatted}
      </p>
      <SendGiftButton onClick={() => togglePaymentOptions()}>
        Presentear
      </SendGiftButton>
    </GiftBox>
  );
})