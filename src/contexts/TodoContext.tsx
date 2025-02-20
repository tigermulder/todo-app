import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { fetchTodoList } from '../service/todolist'
import { ToDo } from '../types/todolist-api-type'

interface TodoContextType {
  todos: ToDo[]
  fetchTodos: () => Promise<void>
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  fetchTodos: async () => {},
  setTodos: () => {},
})

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<ToDo[]>([])

  const fetchTodos = async () => {
    const response = await fetchTodoList()
    setTodos(response.data || [])
  }

  // 최초 렌더링 시 할 일 목록을 불러오고 싶다면 useEffect를 사용할 수 있습니다.
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <TodoContext.Provider value={{ todos, fetchTodos, setTodos }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodos = () => useContext(TodoContext)
