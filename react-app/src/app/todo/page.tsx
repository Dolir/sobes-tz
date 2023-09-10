"use client"
import React, { useEffect, useState } from "react"
import { useStore } from "../_stores"
import { Box, Button, TextField } from "@mui/material"
import { observer } from "mobx-react"
import TodoTable from "./_components/todo-table"
import { SearchBar } from "./_components/searchbar"

function TodoPage() {
  const [newTodo, setNewTodo] = useState("")

  const { todoStore } = useStore()

  useEffect(() => {
    todoStore.fetchTodos(todoStore.filterData)
  }, [todoStore, todoStore.filterData])

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      await todoStore.addTodo(newTodo)
      setNewTodo("")
    }
  }

  return (
    <Box width="100%" display="flex" gap={4} flexDirection="column">
      <Box display="flex" flexDirection="column" gap={4}>
        <h1>Todo App</h1>
        <Box display="flex" gap={2} justifyContent="space-between">
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              size="small"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
            />
            <Button
              disabled={!newTodo}
              variant="contained"
              onClick={handleAddTodo}
            >
              Add
            </Button>
          </Box>
          <SearchBar
            value={todoStore.filterData.search || ""}
            onChange={(e) => {
              todoStore.setFilterData({ search: e.target.value })
            }}
          />
        </Box>
      </Box>
      <TodoTable />
    </Box>
  )
}
export default observer(TodoPage)
