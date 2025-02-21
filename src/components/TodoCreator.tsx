import { useState } from 'react'
import { createTodoList } from '../service/todolist'
import { useTodos } from '../contexts/TodoContext'
import styled from 'styled-components'

const TodoCreator = () => {
  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  const { fetchTodos } = useTodos()
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }
  const createTodoItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const unixDate = new Date(date).getTime()
    const requestDate = {
      text: text,
      done: false,
      deadline: unixDate,
    }
    await createTodoList(requestDate)
    await fetchTodos()
    setText('')
    setDate('')
  }

  return (
    <FormContainer onSubmit={createTodoItem}>
      <Fieldset>
        <Legend>To-do Create</Legend>
        <Label htmlFor="date">Date</Label>
        <Input
          type="datetime-local"
          id="date"
          value={date}
          onChange={handleDate}
          required
        />
        <Label htmlFor="text">Description</Label>
        <Input
          type="text"
          id="text"
          value={text}
          onChange={handleTextChange}
          placeholder="내용을 입력해 주세요"
          required
        />
        <SubmitButton type="submit">생성</SubmitButton>
      </Fieldset>
    </FormContainer>
  )
}

export default TodoCreator

const FormContainer = styled.form`
  width: 100%;
  padding: 2rem;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 1rem;
`

const Legend = styled.legend`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  color: #555;
  font-weight: 600;
`

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #ff4052;
    outline: none;
  }
`

const SubmitButton = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: #ff4052;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff4052;
  }
`
