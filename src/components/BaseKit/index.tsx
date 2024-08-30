import { NavigateFunction, Outlet, useNavigate } from "react-router-dom"
import { FiHome } from "react-icons/fi"
import styled from "styled-components"
import { usePaymentContext } from "src/context/payment";
import { userHook } from "src/store/userReducer";
import { useEffect } from "react";
import Modal from "../Modal";
import { useModalHook } from "src/store/modalReducer";
import Divider from "./Divider";
import { InputComponent } from "./Input";
import { useForm } from "react-hook-form";

const Container = styled.div`
  display: flex; 
  max-width: 100dvw;
  max-height: 100dvh;
  flex-direction: column;

  .back_icon_wrapper {
    position: fixed;
    top: 8px;
    left: 14px;
    z-index: 9999;

    width: 48px;
    height: 48px;
    padding: 8px 10px;
    
    background-color: ${props => props.theme.white};
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    cursor: pointer;
    
    &:hover {
      background-color: ${props => props.theme.off_white};
      transition: 0.8s ease-in-out;
    }
  }
`;

const returnToHome = (navigation: NavigateFunction): void => navigation("/");

export default function Root() {
  const { clearGift } = usePaymentContext();
  const navigation = useNavigate();

  const { handleModal } = useModalHook();
  const { user, resetAction } = userHook();

  useEffect(() => {
    window.addEventListener('storage', () => {
      const hasUser = localStorage.getItem('userInfo');
      
      if (!hasUser) {
        resetAction();
        handleModal(true);
      }
    });

  }, [user.identified]);

  const userIsAuthenticated = !!localStorage.getItem("userInfo");

  return (
    <Container id="base-div">
      <div
        className="back_icon_wrapper"
        onClick={() => returnToHome(navigation)}
      >
        <FiHome
          size={30}
          className="back_icon"
          onClick={clearGift}
        />
      </div>
      <ConfirmationUser identified={userIsAuthenticated} />
      <Outlet />
    </Container>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;  
  width: 100%;
  height: 240px;
  
  border-radius: 2px;

  padding: 12px;
`;

const ModalTitle = styled.span`
  display: flex;
  font-size: 1.2rem;
  padding-bottom: 8px;
`;

const FormArea = styled.section`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  gap: 8px;
`;

export type UserInfoType = {
  name: string;
  email: string;
}

interface ConfirmationProps {
  identified: boolean;
}

const ConfirmationUser = ({ identified }: ConfirmationProps) => {
  const { modalOpen, handleModal } = useModalHook();

  const { setUsername, setEmail, loginAction } = userHook();

  const { register, getValues } = useForm<UserInfoType>();

  const saveDetails = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, email } = getValues();

    setUsername(name);
    setEmail(email);

    const userInfo = { name, email };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    handleModal(false);
    loginAction();
  }
  //TODO: review this conditional
  const showModal: boolean = !!identified || modalOpen.isOpen;
  
  return (
    <Modal
      openModal={modalOpen.isOpen}
      closeModal={() => handleModal(false)}
      buttonActionCreate={saveDetails}
    >
      <Wrapper>
        <ModalTitle>Identifique-se para confirmar sua presença</ModalTitle>
        <Divider />
        <FormArea>
          <InputComponent
            label="Informe seu nome"
            name="name"
            register={register}
          />
          <InputComponent
            label="Informe seu email"
            name="email"
            register={register}
          />
        </FormArea>
      </Wrapper>
    </Modal>
  )
}