import { TodoType } from "@platform/nest-app/lib/slice"
import { makeObservable, observable, action, runInAction } from "mobx"
import { createTodo, getAllTodos, removeTodo, updateTodo } from "../_api"

const defaultFilterData = {
  sortField: "createdAt",
  sortOrder: "desc"
} as const
export class TodoStore {
  todos: TodoType.TodoDto[] = []
  filterData: TodoType.TodoGetAllQueryParams = defaultFilterData
  isFetchingTodos: boolean = false

  constructor() {
    makeObservable(this, {
      todos: observable,
      filterData: observable,
      isFetchingTodos: observable,
      addTodo: action,
      removeTodo: action,
      updateTodo: action,
      fetchTodos: action,
      setFilterData: action,
      clearData: action
    })
  }

  addTodo = async (title: string) => {
    await createTodo({ title })
    await this.fetchTodos(this.filterData)
  }

  updateTodo = async (data: TodoType.TodoUpdateRequestDto) => {
    await updateTodo(data)
    await this.fetchTodos(this.filterData)
  }

  removeTodo = async (id: string) => {
    await removeTodo(id)
    runInAction(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    })
  }

  fetchTodos = async (filterData: TodoType.TodoGetAllQueryParams) => {
    this.isFetchingTodos = true
    const todos = await getAllTodos(filterData)
    runInAction(() => {
      this.isFetchingTodos = false
      this.todos = todos
    })
  }

  setFilterData = (data: Partial<TodoType.TodoGetAllQueryParams>) => {
    this.filterData = { ...this.filterData, ...data }
  }
  clearData = () => {
    this.filterData = defaultFilterData
    this.todos = []
  }
}
