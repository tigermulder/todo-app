import { useTodos } from '../contexts/TodoContext'
import styled from 'styled-components'
import TodoItem from './TodoItem'
import TodoListHeader from './TodoListHeader'

const TodoList = () => {
  const { todos } = useTodos()
  return (
    <TodoListContainerWrapper>
      <TodoListContainer>
        <TodoListHeader />
        <tbody>
          {todos.map((ele, idx) => (
            <TodoItem
              key={ele.id}
              id={ele.id}
              index={idx + 1}
              text={ele.text}
              done={ele.done}
              deadline={ele.deadline}
            />
          ))}
        </tbody>
      </TodoListContainer>
    </TodoListContainerWrapper>
  )
}

export default TodoList

const TodoListContainerWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: 2rem;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`

const TodoListContainer = styled.table`
  width: 100%;
`
