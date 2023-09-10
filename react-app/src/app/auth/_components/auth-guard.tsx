/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { Box, CircularProgress } from "@mui/material"
import { useStore } from "@src/app/_stores"
import { observer } from "mobx-react"
import { useRouter } from "next/navigation"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { toast } from "react-toastify"

export const withAuth = (Component: FC<PropsWithChildren>) => {
  return observer((props: PropsWithChildren) => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { authStore } = useStore()
    useEffect(() => {
      setLoading(true)
      authStore.verifyToken().then((res) => {
        setLoading(false)
        if (!res) {
          toast.error("You are unauthorized")
          router.push("/auth")
        }
      })
    }, [authStore, router])

    if (loading)
      return (
        <Box margin="auto">
          <CircularProgress />
        </Box>
      )

    if (authStore.isAuthenticated) return <Component {...props} />
    return <></>
  })
}
