import { useState, useEffect } from 'react'
import { useTodos } from '../contexts/TodoContext'
import styled from 'styled-components'
import TodoItem from './TodoItem'
import TodoListHeader from './TodoListHeader'
import { useModal } from '../contexts/ModalContext'
import { useToast } from '../contexts/ToastContext'
import { deleteTodoItem } from '../service/todolist'
import TodoListFallbackUI from './TodoListFallbackUI'

const pageSize = 5

const TodoList = () => {
  const { todos, fetchTodos } = useTodos()
  const { showModal } = useModal()
  const { showToast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || ''
  })

  // 검색어가 변경되면 localStorage에 저장하고 현재 페이지를 1로 초기화
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm)
    setCurrentPage(1)
  }, [searchTerm])

  // 검색어에 맞게 todos 필터링
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredTodos.length / pageSize)
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

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
      <SearchContainer>
        <label htmlFor="searchTodo">검색</label>
        <SearchInput
          id="searchTodo"
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      <TodoListContainer>
        <TodoListHeader />
        <tbody>
          {filteredTodos.length > 0 ? (
            paginatedTodos.map((ele) => (
              <TodoItem
                key={ele.id}
                id={ele.id}
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
      <PaginationControls>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          이전
        </button>
        <span>
          {currentPage} / {totalPages || 1}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          다음
        </button>
      </PaginationControls>
      <MultiDeleteButton onClick={handleMultiDelete}>
        선택된 To-do 삭제
      </MultiDeleteButton>
    </TodoListContainerWrapper>
  )
}

export default TodoList

const TodoListContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  padding: 2rem;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
  text-align: left;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
`

const TodoListContainer = styled.table`
  width: 100%;
`

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    background-color: #ff4052;
    color: white;
    border-radius: 8px;
    &:disabled {
      background-color: #e0e0e0;
      cursor: not-allowed;
    }
  }
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
