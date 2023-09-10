import { observer } from "mobx-react"
import React from "react"
import { useStore } from "../../_stores"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import { TodoRow } from "./todo-row"
import { SortableTableCell } from "./sortable-table-cell"

const TodoTable = () => {
  const { todoStore } = useStore()

  return (
    <TableContainer component={Paper} sx={{ height: 400, overflowY: "auto" }}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <SortableTableCell title="Status" field="done" />
            <SortableTableCell title="Title" field="title" />
            <SortableTableCell title="Created Date" field="createdAt" />
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoStore.todos.map((todo) => (
            <TodoRow todo={todo} key={todo.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default observer(TodoTable)
