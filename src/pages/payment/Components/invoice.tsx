import { useEffect, useState } from "react";
import CheckmarkAnimation from "src/assets/checkmarkAnimation"
import Divider from "src/components/BaseKit/Divider";
import styled, { css, keyframes } from "styled-components"
import { ItemsPaid } from "./itemsPaid";

const fadeOut = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const InvoiceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100vh;
`;

const InvoiceContent = styled.div<{ fadeOut: boolean }>`
  display: flex;
  flex-direction: column;
  
  width: 280px;
  height: 420px;

  padding: 16px;
  gap: 8px;
  border: 1px solid ${props => props.theme.light_gray};
  border-radius: 4px;

  animation: ${(props) => (props.fadeOut ? css`${fadeOut} 1s forwards` : 'none')};
`;

const Title = styled.span`
  font-size: 18px;
`;

const PayerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
`;

const PaymentDirection = styled.span`
`;

const PayerInfo = styled.span`

`;


export const Invoice = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <InvoiceWrapper id="invoice">
      {showAnimation ? (
        <CheckmarkAnimation />
      ) : (
        <InvoiceContent fadeOut={!showAnimation} >
          <Title>Recibo do pagamento</Title>
          <PayerDetails>
            DE:
            <Divider />
            <PayerInfo>
              Nome: Igor A.
            </PayerInfo>
            <PayerInfo>
              Email: kijicursis@testus.com
            </PayerInfo>
          </PayerDetails>
          <PayerDetails>
            PARA:
            <Divider />
            <PayerInfo>
              Nome: Maria B.
            </PayerInfo>
            <PayerInfo>
              Email: maria123@testus.com
            </PayerInfo>
          </PayerDetails>
            <ItemsPaid />
        </InvoiceContent>
      )}
    </InvoiceWrapper>
  )
}