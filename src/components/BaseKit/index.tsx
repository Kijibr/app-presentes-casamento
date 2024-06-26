import { NavigateFunction, Outlet, useNavigate } from "react-router-dom"
import { FiHome } from "react-icons/fi"
import styled from "styled-components"
import { usePaymentContext } from "src/context/payment";

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
      <Outlet />
    </Container>
  )
}