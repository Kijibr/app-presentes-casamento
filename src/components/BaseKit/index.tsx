import { NavigateFunction, Outlet, useNavigate } from "react-router-dom"
import { FiHome } from "react-icons/fi"
import styled from "styled-components"
import { usePaymentContext } from "src/context/payment";
import { useEffect } from "react";
import Modal from "../Modal";
import { useModalHook } from "src/store/modalReducer";
import Divider from "./Divider";
import { InputComponent } from "./Input";
import { useForm } from "react-hook-form";
import { CheckboxComponent } from "./Checkbox";
import { confirmInviteAsync, getUserGuestAsync } from "src/api/guests";
import { AppState, useAppDispatch, useAppSelector } from "src/store/store";
import { resetInfo, setPassword, setUsername, toggleIdentified } from "src/store/userReducer";

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

async function readToken(userId: string) {
  if (userId) {
    const request = await getUserGuestAsync(userId);
    const userDetails = request as UserInfoType;

    if (userDetails) {
      localStorage.setItem("userInfo", JSON.stringify(userDetails));
    }
  }
}

const returnToHome = (navigation: NavigateFunction): void => navigation("/home");

function resetUrl() {
  const newUrl = location.href.replace(location.search, "");
  location.replace(newUrl);
}

export default function Root() {
  const dispatch = useAppDispatch();
  const { name, identified, password, id } = useAppSelector((x: AppState) => x.users);

  const { clearGift } = usePaymentContext();
  const navigation = useNavigate();

  const { handleModal } = useModalHook();

  useEffect(() => {
    const hasUser = localStorage.getItem('userInfo');
    if (!hasUser) {
      handleModal(true);
      dispatch(resetInfo());
    }

    const params = new URLSearchParams(location.search);
    const userId = params.get("token");

    if (userId) {
      readToken(userId).then(() => resetUrl());
    }
  }, [])

  useEffect(() => {
    window.addEventListener('storage', () => {
      const hasUser = localStorage.getItem('userInfo');

      if (!hasUser) {
        // SHOW MODAL TO REQUEST USER FOR ACCESS APP FROM LINK IF HASNT TOKEN IN URL
        handleModal(true);
        dispatch(resetInfo());
      }
    });

  }, [identified]);

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
        id={id}
        name={name}
        password={password}
        confirmed={identified}
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
  const dispatch = useAppDispatch();

  const { formState: { errors }, register, getValues, watch, setError, clearErrors } = useForm<UserInfoType>({
    defaultValues: {
      confirmed: false,
    }
  });

  const saveDetails = async () => {
    clearErrors();
    const { password, confirmed } = getValues();
    dispatch(setPassword(password));

    const userDetails = JSON.parse(localStorage.getItem("userInfo")!) as UserInfoType;
    if (!!userDetails) {
      const asnwerSended = await confirmInviteAsync(userDetails.id, confirmed, password)
      if (asnwerSended){
        dispatch(setUsername(userDetails.name));
        dispatch(toggleIdentified());
        localStorage.setItem('userIdentified', 'true');
        handleModal(false);
        return;
      }
      setError("password", { message: "A senha está incorreta!" });
    }
  }

  const userIsAuthenticated = !!localStorage.getItem("userIdentified");
  const showModal: boolean = !userIsAuthenticated || modalOpen.isOpen;

  const confirmedValue = watch('password');

  return (
    <Modal
      openModal={showModal}
      buttonActionCreate={saveDetails}
      enableButton={!!confirmedValue}
    >
      <Wrapper>
        <ModalTitle>Seja bem vindo(a) {name}!</ModalTitle>
        <Divider />
        <FormArea>
          <InputComponent
            label="Informe sua senha para validar a sua confirmação."
            name="password"
            error={errors?.password?.message}
            register={register}
          />
          <CheckboxComponent
            name="confirmed"
            label="CLIQUE AQUI PARA CONFIRMAR SUA PRESENÇA."
            register={register}
          />
        </FormArea>
      </Wrapper>
    </Modal>
  )
}