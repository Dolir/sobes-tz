"use client"

import React from "react"
import { PropsWithChildren } from "react"
import { withAuth } from "../auth/_components/auth-guard"
import { Box, Button } from "@mui/material"
import { useRouter } from "next/navigation"
import { useStore } from "../_stores"

function TodoLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  const { authStore, todoStore } = useStore()
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/auth")
            authStore.logout()
            todoStore.clearData()
          }}
        >
          Log out
        </Button>
      </Box>
      {children}
    </Box>
  )
}
export default withAuth(TodoLayout)
