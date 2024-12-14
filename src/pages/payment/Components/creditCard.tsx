import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { initMercadoPago, CardPayment, StatusScreen } from '@mercadopago/sdk-react';

import { v4 as uuidv4 } from 'uuid';
import { getFromStorage, removeAtStorage } from 'src/utils/storage';
import { UserInfoType } from 'src/components/BaseKit';
import { createCreditCardPaymentAsync } from 'src/api';
import { usePaymentHook, useRedirectHook } from '../paymentsHook';
import { ICardPaymentBrickPayer, ICardPaymentFormData } from '@mercadopago/sdk-react/bricks/cardPayment/type';
import { usePaymentContext } from 'src/context/payment';
import { GiftToPay } from 'src/types';

import 'react-toastify/dist/ReactToastify.css';

const FormContainer = styled.div`
  overflow: auto;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: #2d3748;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #2c5282;
  }
`;

const InfoText = styled.p`
  color: #4a5568;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const appUrl = window.location.origin;

const CreditCardForm = () => {
  const { redirectToPaymentInvoice } = useRedirectHook();
  const { details } = usePaymentHook();
  const { setGiftDetails } = usePaymentContext();
  const paymentId = useRef<string>('');
  const [deviceId, setDeviceId] = useState('');
  const [paymentCompleted, setPaymentStatus] = useState<boolean>(true);

  useEffect(() => {
    const loadMercadoPago = async () => {
      const script = document.createElement('script');
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.async = true;
      document.body.appendChild(script);

      const script2 = document.createElement('script');
      script2.src = "https://www.mercadopago.com/v2/security.js";
      script2.async = true;
      document.body.appendChild(script2);

      script.onload = () => {
        const mpToken: string = import.meta.env.VITE_MP_ACCESS_KEY_DEV;
        initMercadoPago(mpToken, { locale: 'pt-BR', trackingDisabled: true, advancedFraudPrevention: true });
        setDeviceId(uuidv4());
      };
    };

    loadMercadoPago();
  }, []);

  const initialization = {
    amount: parseFloat(details.giftValue),
    payer: {
      email: import.meta.env.VITE_EMAIL_PAYER_DEFAULT,
    },
  };

  const onSubmit = async (param: ICardPaymentFormData<ICardPaymentBrickPayer>) => {
    const currentUser = getFromStorage<UserInfoType>('userInfo')
    const result = await createCreditCardPaymentAsync(details, currentUser.name, param);
    if (!result?.success) {
      setPaymentStatus(false)
    }
    
    removeAtStorage("itemToPay");
    const giftToPayWithCC: GiftToPay = {
      id: details.id,
      paymentId: result.id,
      giftValue: details.giftValue,
      name: details.name,
      paymentMethod: details.paymentMethod
    };
    setGiftDetails(giftToPayWithCC);
    paymentId.current = result.id;

    if (result?.success)
      redirectToPaymentInvoice(result.id);
  };

  const onError = async (error: any) => {
    console.error('Erro no formulário');
  };

  const onReady = () => {
    console.log('Credit Card form its ok');
  };

  return (
    <>
      <FormContainer>
        <Title>Informações do Cartão</Title>
        {!paymentCompleted ?
          <StatusScreen
            initialization={{
              paymentId: paymentId.current,
            }}
            locale='pt-BR'
            customization={{
              visual: {
                texts: {
                  ctaCardErrorLabel: "Confira seus dados e tente novamente",
                  ctaGeneralErrorLabel: "Confira seus dados e tente novamente",
                  ctaReturnLabel: "Voltar à lista de presentes",
                },
              },
              backUrls: {
                'return': `${appUrl}/gifts/`,
                'error': `${appUrl}/gifts/payment/${details.id}`
              }
            }}
          />
          :
          <CardPayment
            initialization={initialization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
            locale='pt-BR'
          />}
        <InfoText>Device ID: {deviceId}</InfoText>
      </FormContainer>
    </>
  );
};

export default () => <CreditCardForm />;