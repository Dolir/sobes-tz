import { TodoType } from "@platform/nest-app/lib/slice"
import { makeObservable, observable, action, runInAction } from "mobx"
import { createTodo, getAllTodos, removeTodo, updateTodo } from "../_api"

export class TodoStore {
  todos: TodoType.TodoDto[] = []
  filterData: TodoType.TodoGetAllQueryParams = {}

  constructor() {
    makeObservable(this, {
      todos: observable,
      filterData: observable,
      addTodo: action,
      removeTodo: action,
      updateTodo: action,
      fetchTodos: action,
      setFilterData: action
    })
  }

  addTodo = async (title: string) => {
    const newTodo = await createTodo({ title })
    runInAction(() => {
      this.todos.push(newTodo)
    })
  }

  updateTodo = async (data: TodoType.TodoUpdateRequestDto) => {
    const newTodo = await updateTodo(data)
    runInAction(() => {
      const thisTodoIndex = this.todos.findIndex((todo) => todo.id === data.id)
      this.todos[thisTodoIndex] = newTodo
    })
  }

  removeTodo = async (id: string) => {
    await removeTodo(id)
    runInAction(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    })
  }

  fetchTodos = async (filterData: TodoType.TodoGetAllQueryParams) => {
    const todos = await getAllTodos(filterData)
    runInAction(() => {
      this.todos = todos
    })
  }

  setFilterData = (data: Partial<TodoType.TodoGetAllQueryParams>) => {
    this.filterData = { ...this.filterData, ...data }
  }
}
