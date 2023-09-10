"use client"
import React from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Box, Typography } from "@mui/material"
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import { AuthType } from "@platform/nest-app/lib/slice"

type AuthFormProps = {
  onSubmit: SubmitHandler<AuthType.BaseAuthRequestDto>
  title: string
}
export const AuthForm = ({ onSubmit, title }: AuthFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = useForm<AuthType.BaseAuthRequestDto>({
    defaultValues: { name: "", password: "" }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Typography variant="h4" align="center" mb={2}>
        {title}
      </Typography>
      <Box display="flex" flexDirection="column" gap={4}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} required label="Name" />}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField {...field} required label="Password" />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid || isSubmitting}
        >
          Proceed
        </Button>
      </Box>
    </form>
  )
}
