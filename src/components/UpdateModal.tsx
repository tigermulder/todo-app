import { useState } from 'react'
import styled from 'styled-components'
import { updateTodoItem } from '../service/todolist'

interface UpdateModalProps {
  id: number
  initialText: string
  initialDeadline: number
  onClose: () => void
  onUpdated: () => void
}

const UpdateModal = ({
  id,
  initialText,
  initialDeadline,
  onClose,
  onUpdated,
}: UpdateModalProps) => {
  const [text, setText] = useState(initialText)
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
      const params = { text, done: false, deadline: new Date(date).getTime() }
      await updateTodoItem(id, params)
      onUpdated()
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
          <Title>To-do 업데이트</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Content>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="text">내용</Label>
            <Input
              id="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <Label htmlFor="date">마감일</Label>
            <Input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
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

export default UpdateModal

// styled-components (Overlay, ModalContainer, Header, Title, CloseButton, Content, Label, Input, SubmitButton, ErrorMessage)
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
`
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`
const CloseButton = styled.button`
  position: absolute;
  right: 0;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`
const Content = styled.div`
  margin-top: 1rem;
`
const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
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
