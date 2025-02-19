import { useEffect, useState } from 'react'
import { fetchTodoList } from '../service/todolist'
import { ToDo } from '../types/todolist-api-type'

const TodoList = () => {
  const [todos, setTodos] = useState<ToDo[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetchTodoList()
      setTodos(response.data || [])
    }
    fetchTodos()

    console.log(todos)
  }, [])

  return (
    <div>
      <div>컨테이너입니다</div>
    </div>
  )
}

export default TodoList
