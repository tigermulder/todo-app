import TodoCreator from './components/TodoCreator'
import TodoList from './components/TodoList'
import { ModalProvider } from './contexts/ModalContext'
import { ToastProvider } from './contexts/ToastContext'
import styled from 'styled-components'
import { TodoProvider } from './contexts/TodoContext'
import { UpdateModalProvider } from './contexts/UpdateModalContext'

function App() {
  return (
    <TodoProvider>
      {/* todo-list data fetch */}
      <ToastProvider>
        {/* 토스트 */}
        <ModalProvider>
          {/* 모달 */}
          <TodoContainer>
            <TodoCreator />
            {/* 업데이트 모달 */}
            <UpdateModalProvider>
              <TodoList />
            </UpdateModalProvider>
          </TodoContainer>
        </ModalProvider>
      </ToastProvider>
    </TodoProvider>
  )
}

export default App

const TodoContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
