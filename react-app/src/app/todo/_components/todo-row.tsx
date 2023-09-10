import { Button, Switch, TableCell, TableRow } from "@mui/material"
import { TodoType } from "@platform/nest-app/lib/slice"
import { useStore } from "@src/app/_stores"
import { observer } from "mobx-react"
import React, { useState } from "react"

export const TodoRow = observer(({ todo }: { todo: TodoType.TodoDto }) => {
  const { todoStore } = useStore()
  const [processing, setProcessing] = useState(false)
  return (
    <TableRow
      sx={{
        opacity: processing ? 0.5 : 1,
        pointerEvents: processing ? "none" : "initial"
      }}
    >
      <TableCell>
        <Switch
          checked={todo.done}
          onChange={(_, checked) => {
            setProcessing(true)
            todoStore
              .updateTodo({ ...todo, done: checked })
              .then(() => setProcessing(false))
          }}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        {todo.title}
      </TableCell>
      <TableCell>{new Date(todo.createdAt).toLocaleString()}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            setProcessing(true)
            todoStore.removeTodo(todo.id).finally(() => setProcessing(false))
          }}
          color="error"
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  )
})
