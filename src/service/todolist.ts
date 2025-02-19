import { APIResponse, ToDoRequest } from "../types/api"
import { ToDo } from "../types/api"

export const fetchTodoList = async (): Promise<APIResponse<ToDo[]>> => {
  const response = await fetch('/api/todos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const responseData = response.json()
  return responseData
}

export const createTodoList = async (params:ToDoRequest): Promise<APIResponse<ToDo>> => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
  const responseData = response.json()
  return responseData
}

export const fetchTodoItem = async (id:number): Promise<APIResponse<ToDo>> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const responseData = response.json()
  return responseData
}

export const updateTodoItem = async (id:number, params:ToDoRequest): Promise<APIResponse<ToDo>> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
  const responseData = response.json()
  return responseData
}

export const deleteTodoItem = async (id:number): Promise<APIResponse<void>> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const responseData = response.json()
  return responseData
}