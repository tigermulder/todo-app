import { useTodos } from '../contexts/TodoContext'
import styled from 'styled-components'
import TodoItem from './TodoItem'
import TodoListHeader from './TodoListHeader'
import { useModal } from '../contexts/ModalContext'
import { useToast } from '../contexts/ToastContext'
import { deleteTodoItem } from '../service/todolist'
import TodoListFallbackUI from './TodoListFallbackUI'

const TodoList = () => {
  const { todos, fetchTodos } = useTodos()
  const { showModal } = useModal()
  const { showToast } = useToast()

  const handleMultiDelete = () => {
    const selectedIdsStr = localStorage.getItem('selectedIds')
    const selectedIds: number[] = selectedIdsStr
      ? JSON.parse(selectedIdsStr)
      : []

    if (selectedIds.length === 0) {
      showToast('삭제할 항목이 없습니다')
      return
    }

    showModal({
      title: '선택된 To-do 삭제',
      description: '정말로 선택된 항목을 모두 삭제하시겠습니까?',
      onConfirm: async () => {
        await Promise.all(selectedIds.map((id) => deleteTodoItem(id)))
        await fetchTodos()
        localStorage.removeItem('selectedIds')
        showToast('선택된 항목이 삭제되었습니다')
      },
    })
  }

  return (
    <TodoListContainerWrapper>
      <MultiDeleteButton onClick={handleMultiDelete}>
        선택된 To-do 삭제
      </MultiDeleteButton>
      <TodoListContainer>
        <TodoListHeader />
        <tbody>
          {todos.length > 0 ? (
            todos.map((ele, idx) => (
              <TodoItem
                key={ele.id}
                id={ele.id}
                index={idx + 1}
                text={ele.text}
                done={ele.done}
                deadline={ele.deadline}
              />
            ))
          ) : (
            <TodoListFallbackUI />
          )}
        </tbody>
      </TodoListContainer>
    </TodoListContainerWrapper>
  )
}

export default TodoList

const TodoListContainerWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
  padding: 2rem;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`

const MultiDeleteButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: #ff4052;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`

const TodoListContainer = styled.table`
  width: 100%;
`
