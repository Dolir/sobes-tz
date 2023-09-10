"use client"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function AuthPage() {
  const router = useRouter()
  useEffect(() => {
    router.push("/auth/sign-in")
  }, [router])

  return <></>
}
