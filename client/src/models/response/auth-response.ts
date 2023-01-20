import { IUser } from "../iuser"

export interface AuthResponse {
   accessToken: string
   refreshToken: string
   user: IUser
}