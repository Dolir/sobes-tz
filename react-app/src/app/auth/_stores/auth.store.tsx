import { makeObservable, observable, action } from "mobx"
import { check, signIn, signUp } from "../_api"
import { AuthType } from "@platform/nest-app/lib/slice"
import { accessTokenKey } from "@src/utils/http-client"

export class AuthStore {
  isAuthenticated = true

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
      signUp: action,
      signIn: action,
      logout: action
    })
  }

  async signUp(data: AuthType.SignUpRequestDto) {
    const { accessToken } = await signUp(data)
    localStorage.setItem(accessTokenKey, accessToken)
    this.isAuthenticated = true
  }
  async signIn(data: AuthType.SignInRequestDto) {
    const { accessToken } = await signIn(data)
    localStorage.setItem(accessTokenKey, accessToken)

    this.isAuthenticated = true
  }

  async verifyToken() {
    const result: boolean = await check()
    if (result) return true
    this.logout()
    return false
  }

  logout() {
    localStorage.removeItem(accessTokenKey)
    // Implement your logout logic here (e.g., clear JWT token)
    // If the user logs out, set isAuthenticated to false
    this.isAuthenticated = false
  }
}
