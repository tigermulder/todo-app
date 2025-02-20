import { useState } from 'react'
import { useToast } from '../contexts/ToastContext'
import { useModal } from '../contexts/ModalContext'
import { useTodos } from '../contexts/TodoContext'
import { deleteTodoItem } from '../service/todolist'
import styled from 'styled-components'

interface TodoItemProps {
  id: number
  index: number
  text: string
  done: boolean
  deadline: number
}

const TodoItem = ({ id, index, text, done, deadline }: TodoItemProps) => {
  const [checked, setChecked] = useState(false)
  const [isCustomDisabled, setIs$customDisabled] = useState(true)
  const { showModal } = useModal()
  const { showToast } = useToast()
  const { fetchTodos } = useTodos()
  const handleChecked = () => {
    setChecked((prev) => !prev)
    setIs$customDisabled((prev) => !prev)
  }

  const handleUpdate = () => {
    if (!checked) {
      showToast('목록을 체크해주세요')
    }
  }
  const handleDelete = () => {
    if (!checked) {
      showToast('목록을 체크해주세요')
    }
    showModal({
      title: `${index}번 To-do 삭제`,
      description: '정말로 삭제하시겠습니까?',
      onConfirm: async () => {
        await deleteTodoItem(id)
        await fetchTodos()
      },
    })
  }

  return (
    <>
      <StyledRow $done={done}>
        <CheckboxCell>
          <input type="checkbox" checked={checked} onChange={handleChecked} />
        </CheckboxCell>
        <IndexCell>{index}</IndexCell>
        <TextCell>{text}</TextCell>
        <DeadlineCell>
          {new Date(deadline).toLocaleDateString().replace(/\.$/, '')}
        </DeadlineCell>
        <StatusCell $done={done}>{done ? '완료' : '미완료'}</StatusCell>
        <td>
          <UpdateButton
            $customDisabled={isCustomDisabled}
            onClick={handleUpdate}
          >
            수정
          </UpdateButton>
        </td>
        <td>
          <DeleteButton
            $customDisabled={isCustomDisabled}
            onClick={handleDelete}
          >
            삭제
          </DeleteButton>
        </td>
      </StyledRow>
    </>
  )
}

export default TodoItem

const StyledRow = styled.tr<{ $done: boolean }>`
  background-color: #fff;
  opacity: ${({ $done }) => ($done ? 0.6 : 1)};
  border-bottom: 1px solid #e3e3e3;
  td {
    padding: 15px 0;

    button {
      transition: all 0.2s ease;
    }
  }
  &:hover {
    background-color: #fafafa;
  }
`

const CheckboxCell = styled.td`
  position: relative;
  input[type='checkbox'] {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    margin: 0;
    cursor: pointer;
    accent-color: #ff4052;
  }
`

const IndexCell = styled.td`
  color: #ff4052;
  font-weight: bold;
  min-width: 40px;
`
const TextCell = styled.td``
const DeadlineCell = styled.td`
  color: #999;
  font-size: 14px;
  text-align: center;
`
const StatusCell = styled.td<{ $done: boolean }>`
  font-weight: 500;
  color: ${({ $done }) => ($done ? '#0052ff' : '#ff3b30')};
  text-align: center;
`

const UpdateButton = styled.button<{ $customDisabled: boolean }>`
  padding: 6px 10px;
  background-color: ${({ $customDisabled }) =>
    $customDisabled ? '#e0e0e0' : '#afd6a1'};
  border: none;
  color: ${({ $customDisabled }) => ($customDisabled ? '#333333' : '#3a6d3d')};
  border-radius: 14px;
  font-size: 14px;
  cursor: ${({ $customDisabled }) => ($customDisabled ? 'auto' : 'pointer')};
`

const DeleteButton = styled.button<{ $customDisabled: boolean }>`
  padding: 6px 10px;
  background-color: ${({ $customDisabled }) =>
    $customDisabled ? '#e0e0e0' : '#ff4052'};
  border: none;
  color: ${({ $customDisabled }) => ($customDisabled ? '#333333' : '#fff')};
  border-radius: 14px;
  font-size: 14px;
  cursor: ${({ $customDisabled }) => ($customDisabled ? 'auto' : 'pointer')};
`
