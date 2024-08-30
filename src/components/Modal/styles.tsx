import styled from "styled-components";

export const ModalWrapper = styled.div`
`;

type ModalType = {
  modalFilter?: boolean;
  customWidth?: string;
  customHeight?: string;
}

export const ModalContent = styled.div<ModalType>`
  display: flex;
  
  z-index: 999;
  &.confirmation{
    z-index: 1000;
  }
  padding: 24px;
  
  width: ${props => props.customWidth ?? '740px'};
  height: 24rem;
  
  min-width: 200px;
  
  min-height: 200px;
  
  top: ${props => props.modalFilter ? '44%' : '50%'};
  left: 50%;

  flex-direction: column;
  border-radius: 6px;
  position: fixed;
  
  transform: translate(-50%, -50%) scale(0);

  &.smallBox {
    width: 400px;
    height: 232px;
  }

  background: ${props => props.theme.white};
  transition: all .2s;

  &.openModal{
    transform: translate(-50%, -50%) scale(1);
    padding: 12px;
  }
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  
	font-weight: bold;
  line-height: 16px;

  border: none;
  background: none;

  cursor: pointer;
  color: ${props => props.theme.primary};
`;

interface FormButtonProps {
  width?: string;
}

export const FormButton = styled.button<FormButtonProps>`
  background: ${props => props.theme.dark_green};
  width: ${props => props.width ?? '180px'};
  height: 40px;
  border-radius: 4px;
  border: 1px solid;
  color: ${props => props.theme.primary};
  
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px;
  
  cursor: pointer;

  transition: 0.3s ease-in-out;

  &:hover {
    opacity: 90%;
    
    border: 1px solid ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }

	&:disabled {
    &:hover {
      border-color: ${props => props.theme.gray};
		};
    
		border-color: ${props => props.theme.gray};
		color: ${props => props.theme.gray};
    cursor: not-allowed;
	}

  &.button-full {
      margin: 0 6px;
			width: 100%;
			background-color: ${props => props.theme.primary};
			color: ${props => props.theme.white};
			
			&:hover {
				background-color: ${props => props.theme.primary};
			};
		}

  line-height: 16px;
`;

export const AreaButtons = styled.div`
  display: flex;  
  height: 24px;
  margin-top: -16px;
  margin-bottom: 16px;
  
  &.manyButtons {
    margin: 0;
    gap: 16px;
  }
  
  &.flex-end {
    margin-top: 16px;
    float: right;
    align-self: flex-end;
  }
`;

export const Overlay = styled.div`
  &.overlay{
    &.confirmation{
      border-radius: 6px;
    }
    position: fixed;
    z-index: 999;
    display: flex;
    top: 0;
    left: 0;
    right : 0;
    bottom: 0;
    background: rgba(9, 8, 8, 0.69);
  	transition: all .3s;
  }
`;