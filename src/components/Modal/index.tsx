import clsx from "clsx";
import { AreaButtons, ButtonClose, FormButton, ModalContent, ModalWrapper, Overlay } from "./styles";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface ModalProps {
  children?: React.ReactNode;
  className?: string;

  openModal: boolean;
  closeModal?: () => void;

  customSize?: boolean;
  customWidth?: string;
  customHeight?: string;

  enableButton: boolean;
  buttonActionCreate?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>((props: ModalProps, ref) => {
  const {
    children,
    className,
    openModal,
    enableButton = true,
    closeModal,
    buttonActionCreate,
    ...rest
  } = props;

  const portal = document.getElementById("modal") as HTMLElement

  return (
    <ModalWrapper {...rest} ref={ref} className={className}>
      <Overlay className={clsx({ overlay: openModal }, className)}>
        {createPortal(
          <ModalContent
            className={clsx(
              { openModal: openModal },
              "smallBox",
              className)}
          >
            <>
              {children}
            </>
            <AreaButtons>
              <FormButton
                id="modalButton"
                type="submit"
                className="button-full"
                disabled={!enableButton}
                onClick={buttonActionCreate}
              >
                Enviar resposta
              </FormButton>
            </AreaButtons>
          </ModalContent>,
          portal
        )}
      </Overlay>
    </ModalWrapper>
  )
})

export default Modal;