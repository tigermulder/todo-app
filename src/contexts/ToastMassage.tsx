import { createContext, useContext, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

interface ToastContextProps {
  showToast: (message: string) => void
  hideToast: () => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')

  const showToast = (message: string) => {
    setMessage(message)
    setIsVisible(true)
  }

  const hideToast = () => {
    setIsVisible(false)
  }

  // 토스트가 보여지면 2초 후 자동으로 숨김
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {isVisible && <ToastWrapper onClick={hideToast}>{message}</ToastWrapper>}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast는 ToastProvider 내부에서 사용되어야 합니다.')
  }
  return context
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-15px); }
  to { opacity: 1; transform: translateY(0); }
`

const ToastWrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  background: #333;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-in-out;
  cursor: pointer;
`
