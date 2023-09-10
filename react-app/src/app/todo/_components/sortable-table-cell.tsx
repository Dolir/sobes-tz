import { TodoType } from "@platform/nest-app/lib/slice"
import { Box, TableCell } from "@mui/material"
import { observer } from "mobx-react"
import { useStore } from "@src/app/_stores"

export const SortableTableCell = observer(
  ({ title, field }: { title: string; field: keyof TodoType.TodoDto }) => {
    const { todoStore } = useStore()

    return (
      <TableCell
        onClick={() =>
          todoStore.setFilterData({
            sortField: field,
            sortOrder: todoStore.filterData.sortOrder === "asc" ? "desc" : "asc"
          })
        }
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            cursor: "pointer",
            userSelect: "none"
          }}
        >
          {title}
          {todoStore.filterData.sortField === field && (
            <Box>{todoStore.filterData.sortOrder === "asc" ? "🔽" : "🔼"}</Box>
          )}
        </Box>
      </TableCell>
    )
  }
)
