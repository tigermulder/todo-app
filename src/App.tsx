import TodoCreator from './components/TodoCreator'
import TodoList from './components/TodoList'
import { ToastProvider } from './contexts/ToastMassage'
import styled from 'styled-components'

function App() {
  return (
    <ToastProvider>
      <TodoContainer>
        <TodoCreator />
        <TodoList />
      </TodoContainer>
    </ToastProvider>
  )
}

export default App

const TodoContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
