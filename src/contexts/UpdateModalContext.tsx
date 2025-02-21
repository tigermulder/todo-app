import { createContext, useContext, useState, ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { updateTodoItem } from '../service/todolist'

interface UpdateModalData {
  id: number
  initialText: string
  initialDone: boolean
  initialDeadline: number
  onUpdated?: () => void
}

interface UpdateModalContextProps {
  showUpdateModal: (data: UpdateModalData) => void
  hideUpdateModal: () => void
}

const UpdateModalContext = createContext<UpdateModalContextProps>({
  showUpdateModal: () => {},
  hideUpdateModal: () => {},
})

export const useUpdateModal = () => useContext(UpdateModalContext)

export const UpdateModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalData, setModalData] = useState<UpdateModalData | null>(null)

  const showUpdateModal = (data: UpdateModalData) => {
    setModalData(data)
  }

  const hideUpdateModal = () => {
    setModalData(null)
  }

  return (
    <UpdateModalContext.Provider value={{ showUpdateModal, hideUpdateModal }}>
      {children}
      {modalData && (
        <UpdateModalComponent data={modalData} onClose={hideUpdateModal} />
      )}
    </UpdateModalContext.Provider>
  )
}

interface UpdateModalComponentProps {
  data: UpdateModalData
  onClose: () => void
}

const UpdateModalComponent = ({ data, onClose }: UpdateModalComponentProps) => {
  const { id, initialText, initialDone, initialDeadline, onUpdated } = data
  const [text, setText] = useState(initialText)
  const [done, setDone] = useState(initialDone)
  const [date, setDate] = useState(
    new Date(initialDeadline).toISOString().slice(0, 16)
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const params = { text, done, deadline: new Date(date).getTime() }
      await updateTodoItem(id, params)
      if (onUpdated) {
        onUpdated()
      }
      onClose()
    } catch (err) {
      setError('업데이트에 실패했습니다. 다시 시도해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>To-do 수정</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Content>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="update-text">내용</Label>
            <Input
              id="update-text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <Label htmlFor="update-date">마감일</Label>
            <Input
              id="update-date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Label htmlFor="update-done">완료처리</Label>
            <ToggleInput
              id="update-done"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : '저장'}
            </SubmitButton>
          </form>
        </Content>
      </ModalContainer>
    </Overlay>
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
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.2s ease-in-out;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  margin-top: 1rem;
`

const Label = styled.label`
  width: 100%;
  display: inline-block;
  text-align: left;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
`

const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 3rem;
  height: 1.6rem;
  border: 2px solid gray;
  border-radius: 1.25em;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  margin-bottom: 1rem;

  &:checked {
    background-color: tomato;
    border-color: tomato;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1.5em;
    height: 1.6em;
    border-radius: 50%;
    background-color: gray;
    transform: scale(0.8);
    transition: left 250ms linear, background-color 250ms linear;
  }

  &:checked::before {
    left: 1.5rem;
    background-color: white;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #ff4052;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`
