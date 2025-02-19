import { APIResponse, ToDoRequest, ErrorResponse } from "../types/todolist-api-type"
import { ToDo } from "../types/todolist-api-type"

export const fetchTodoList = async (): Promise<APIResponse<ToDo[]>> => {
  try {
    const response = await fetch('/api/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if(!response.ok){
      const errorData = await response.json().catch(() => ({}))
      throw { status: response.status, message: errorData.message || "네트워크 응답이 올바르지 않습니다." }
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('네트워크에러', error)
    if (error && typeof error === 'object' && 'status' in error) {
      const errorResponse = error as ErrorResponse;
      return { code: errorResponse.status, message: errorResponse.message }
    }
    return { code: 500, message: '에러가 발생했습니다.' }
  }
}

export const createTodoList = async (params:ToDoRequest): Promise<APIResponse<ToDo>> => {
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
    if(!response.ok){
      const errorData = await response.json().catch(() => ({}))
      throw { status: response.status, message: errorData.message || "네트워크 응답이 올바르지 않습니다." }
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('네트워크에러', error)
    if (error && typeof error === 'object' && 'status' in error) {
      const errorResponse = error as ErrorResponse;
      return { code: errorResponse.status, message: errorResponse.message };
    }
    return { code: 500, message: '에러가 발생했습니다.' }
  }
}

export const fetchTodoItem = async (id:number): Promise<APIResponse<ToDo>> => {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if(!response.ok){
      const errorData = await response.json().catch(() => ({}))
      throw { status: response.status, message: errorData.message || "네트워크 응답이 올바르지 않습니다." }
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('네트워크에러', error)
    if (error && typeof error === 'object' && 'status' in error) {
      const errorResponse = error as ErrorResponse;
      return { code: errorResponse.status, message: errorResponse.message };
    }
    return { code: 500, message: '에러가 발생했습니다.' }
  }
}

export const updateTodoItem = async (id:number, params:ToDoRequest): Promise<APIResponse<ToDo>> => {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
    if(!response.ok){
      const errorData = await response.json().catch(() => ({}))
      throw { status: response.status, message: errorData.message || "네트워크 응답이 올바르지 않습니다." }
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    if (error && typeof error === 'object' && 'status' in error) {
      const errorResponse = error as ErrorResponse;
      return { code: errorResponse.status, message: errorResponse.message };
    }
    return { code: 500, message: '에러가 발생했습니다.' };
  }
}

export const deleteTodoItem = async (id:number): Promise<APIResponse<void>> => {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if(!response.ok){
      const errorData = await response.json().catch(() => ({}))
      throw { status: response.status, message: errorData.message || "네트워크 응답이 올바르지 않습니다." }
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('네트워크에러', error)
    if (error && typeof error === 'object' && 'status' in error) {
      const errorResponse = error as ErrorResponse;
      return { code: errorResponse.status, message: errorResponse.message }
    }
    return { code: 500, message: '에러가 발생했습니다.' }
  }
}