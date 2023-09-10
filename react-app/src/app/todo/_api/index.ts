import { TodoType } from "@platform/nest-app/lib/slice"
import { httpClient } from "@src/utils/http-client"

export const createTodo = (data: TodoType.TodoCreateRequestDto) => {
  return httpClient
    .post<TodoType.TodoCreateResponseDto>("/todo", data)
    .then((res) => res.data)
}
export const getAllTodos = (params?: TodoType.TodoGetAllQueryParams) => {
  return httpClient
    .get<TodoType.TodoGetAllResponseDto>("/todo", { params })
    .then((res) => res.data)
}
export const updateTodo = ({ id, ...data }: TodoType.TodoUpdateRequestDto) => {
  return httpClient
    .put<TodoType.TodoUpdateResponseDto>(`/todo/${id}`, data)
    .then((res) => res.data)
}
export const removeTodo = (id: string) => {
  return httpClient.delete<void>(`/todo/${id}`).then((res) => res.data)
}
