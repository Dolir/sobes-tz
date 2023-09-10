"use client"
import { Provider } from "mobx-react"
import { PropsWithChildren } from "react"
import { AuthStore } from "@src/app/auth/_stores/auth.store"
import { TodoStore } from "@src/app/todo/_stores/todo.store"
import { useContext } from "react"
import { MobXProviderContext } from "mobx-react"

export const useStore = () => useContext(MobXProviderContext) as typeof stores
const stores = {
  authStore: new AuthStore(),
  todoStore: new TodoStore()
}
export const StoresProvider = ({ children }: PropsWithChildren) => (
  <Provider {...stores}>{children}</Provider>
)
