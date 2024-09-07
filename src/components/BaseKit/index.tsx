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
import { CheckboxComponent } from "./Checkbox";
import { getUserGuestAsync } from "src/api/guests";

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

async function readToken(userId: string, saveUsername: (value: string) => void) {
  if (userId) {
    const request = await getUserGuestAsync(userId);
    const userDetails = request as UserInfoType;

    if (userDetails) {
      saveUsername(userDetails.name)
      localStorage.setItem("userIdentified", JSON.stringify(userDetails));
    }
  }
}

const returnToHome = (navigation: NavigateFunction): void => navigation("/home");

function reserUrl() {
  const newUrl = location.href.replace(location.search, "");
  location.replace(newUrl);
}

export default function Root() {
  const { clearGift } = usePaymentContext();
  const navigation = useNavigate();

  const { handleModal } = useModalHook();
  const { user, resetAction, setUsername } = userHook();

  useEffect(() => {
    const hasUser = localStorage.getItem('userInfo');
    if (!hasUser) {
      handleModal(true);
      resetAction();
    }

    const params = new URLSearchParams(location.search);
    const userId = params.get("token");

    if (userId) {
      readToken(userId, setUsername).then(() => reserUrl());
    }
  }, [])

  useEffect(() => {
    window.addEventListener('storage', () => {
      const hasUser = localStorage.getItem('userInfo');

      if (!hasUser) {
        handleModal(true);
        resetAction();
      }
    });

  }, [user.identified]);

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
      <ConfirmationUser
        id={user.id}
        name={user.name}
        password={user.password}
        confirmed={user.identified}
      />
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
  id: string;
  name: string;
  password: string;
  confirmed: boolean;
}

const ConfirmationUser = ({ name, confirmed }: UserInfoType) => {
  const { modalOpen, handleModal } = useModalHook();

  const { setPassword, loginAction } = userHook();

  const { register, getValues, watch } = useForm<UserInfoType>({
    defaultValues: {
      confirmed: false,
    }
  });

  const saveDetails = async () => {
    const { password } = getValues();

    setPassword(password);

    const userInfo = { name, password };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    loginAction();
    handleModal(false);
  }

  const userIsAuthenticated = !!localStorage.getItem("userInfo");
  const showModal: boolean = !userIsAuthenticated || modalOpen.isOpen;

  const confirmedValue = watch('confirmed');

  return (
    <Modal
      openModal={showModal}
      buttonActionCreate={saveDetails}
      enableButton={confirmedValue}
    >
      <Wrapper>
        <ModalTitle>Seja bem vindo(a) {name}!</ModalTitle>
        <Divider />
        <FormArea>
          <InputComponent
            label="Informe sua senha para validar a sua confirmação."
            name="password"
            register={register}
          />
          <CheckboxComponent
            name="confirmed"
            label="Clique aqui para confirmar sua presença."
            register={register}
          />
        </FormArea>
      </Wrapper>
    </Modal>
  )
}