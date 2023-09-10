import { TextField } from "@mui/material"
import { useDebouncedCallback } from "@src/utils/hooks/useDebouncedCallback"
import React, { ChangeEvent, ChangeEventHandler, useState } from "react"

type SearchBarProps = {
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
}
export const SearchBar = ({ onChange, value }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value)

  const update = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }, 400)

  return (
    <TextField
      size="small"
      type="text"
      value={inputValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        update(e)
      }}
      placeholder="Search todos"
    />
  )
}
