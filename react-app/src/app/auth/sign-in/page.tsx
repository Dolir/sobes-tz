"use client"
import React from "react"
import { AuthType } from "@platform/nest-app/lib/slice"
import { toast } from "react-toastify"
import { AuthForm } from "../_components/auth-form"
import { Box, Button } from "@mui/material"
import { useRouter } from "next/navigation"
import { useStore } from "@src/app/_stores"
import { AxiosError } from "axios"

const SignInPage: React.FC = () => {
  const router = useRouter()
  const { authStore } = useStore()
  const onSubmit = async (data: AuthType.BaseAuthRequestDto) => {
    return authStore
      .signIn(data)
      .then((res) => {
        router.push("/todo")
        toast.success("logged in")
      })
      .catch((err: AxiosError<Error>) => {
        toast.error(err.response?.data.message)
      })
  }

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={4}>
      <AuthForm onSubmit={onSubmit} title="Sign In" />
      <Button color="info" onClick={() => router.push("/auth/sign-up")}>
        Want to sign up ?
      </Button>
    </Box>
  )
}

export default SignInPage
