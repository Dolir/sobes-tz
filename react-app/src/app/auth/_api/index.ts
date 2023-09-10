import { AuthType } from "@platform/nest-app/lib/slice"
import { httpClient } from "@src/utils/http-client"

export const signIn = (data: AuthType.SignInRequestDto) => {
  return httpClient
    .post<AuthType.SignInResponseDto>("/auth/signIn", data)
    .then((res) => res.data)
}
export const signUp = (data: AuthType.SignUpRequestDto) => {
  return httpClient
    .post<AuthType.SignUpResponseDto>("/auth/signUp", data)
    .then((res) => res.data)
}
export const check = () => {
  return httpClient.get("/auth/check").then((res) => res.data)
}
