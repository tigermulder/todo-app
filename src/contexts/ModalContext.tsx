import { createContext, useContext, useState, ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

interface ModalContent {
  title: string
  description: string
  onConfirm?: () => void
}

interface ModalContextProps {
  showModal: (content: ModalContent) => void
  hideModal: () => void
}

const ModalContext = createContext<ModalContextProps>({
  showModal: () => {},
  hideModal: () => {},
})

export const useModal = () => useContext(ModalContext)

interface ModalProviderProps {
  children: ReactNode
}
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)

  const showModal = (content: ModalContent) => {
    setModalContent(content)
  }

  const hideModal = () => {
    setModalContent(null)
  }

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent && (
        <Overlay>
          <ModalContainer>
            <Header>
              <Title>{modalContent.title}</Title>
              <CloseButton onClick={hideModal}>&times;</CloseButton>
            </Header>
            <Content>
              <p>{modalContent.description}</p>
            </Content>
            <Footer>
              <CancelButton onClick={hideModal}>취소</CancelButton>
              <ConfirmButton
                onClick={() => {
                  modalContent.onConfirm && modalContent.onConfirm()
                  hideModal()
                }}
              >
                삭제
              </ConfirmButton>
            </Footer>
          </ModalContainer>
        </Overlay>
      )}
    </ModalContext.Provider>
  )
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-15px); }
  to { opacity: 1; transform: translateY(0); }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.2s ease-in-out;
`

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
`

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  background: transparent;
  border: none;
  font-size: 40px;
  cursor: pointer;
`

const Content = styled.div`
  margin: 20px 0;
  color: #333;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

const CancelButton = styled.button`
  width: 50%;
  background: #ccc;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`

const ConfirmButton = styled.button`
  width: 50%;
  background: #ff4052;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`
