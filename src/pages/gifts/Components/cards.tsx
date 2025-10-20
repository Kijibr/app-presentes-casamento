import { memo } from "react"
import { CardComponent } from "src/components/Cards";
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
    <>
      <CardComponent
        content={{
          id,
          image: image!,
          name
        }}
        buttonText="Presentear"
        buttonAction={togglePaymentOptions}
        children={(
          <>
            <p className="giftValue">
              {giftValueFormatted}
            </p>
          </>
        )}
      />
    </>
  );
})