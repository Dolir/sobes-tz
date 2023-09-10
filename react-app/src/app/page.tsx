import { Box, Button } from "@mui/material"
import Link from "next/link"

export default function Page() {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={10}
    >
      <Link href="/auth/sign-in">
        <Button variant="outlined" color="error">
          Go to sign-in
        </Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button variant="outlined" color="warning">
          Go to sign-up
        </Button>
      </Link>
      <Link href="/todo">
        <Button variant="outlined" color="primary">
          Go to todos
        </Button>
      </Link>
    </Box>
  )
}
