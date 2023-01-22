import { IUser } from "../models/iuser"
import { makeAutoObservable } from "mobx"
import AuthService from "../services/auth-service"
import axios from 'axios'
import { AuthResponse } from "../models/response/auth-response"
import { API_URL } from "../http"

export default class Store {
   user = {} as IUser
   isAuth = false             // true if authorized
   isLoading = false

   constructor() {            // call 'mobx'
      makeAutoObservable(this)
   }

   setAuth(bool: boolean) {   // change current value with param 'bool'
      this.isAuth = bool
   }

   setUser(user: IUser) {     // change current value with param 'user'
      this.user = user
   }

   setLoading(bool: boolean) {//change current value with param 'bool'
      this.isLoading = bool
   }

   async login(email: string, password: string) {
      try {
         const response = await AuthService.login(email, password)
         console.log(response)
         localStorage.setItem('token', response.data.accessToken)
         this.setAuth(true)
         this.setUser(response.data.user)
      } catch (e: any) {
         console.log(e.response?.data?.message)
      }
   }

   async registration(email: string, password: string) {
      try {
         const response = await AuthService.registration(email, password)
         console.log(response)
         localStorage.setItem('token', response.data.accessToken)
         // this.setAuth(true)
         this.setAuth(false)
         this.setUser(response.data.user)
      } catch (e: any) {
         console.log(e.response?.data?.message)
      }
   }

   async logout() {
      try {
         const response = await AuthService.logout()
         console.log(response)
         localStorage.removeItem('token')
         this.setAuth(false)
         this.setUser({} as IUser)
         // ---???
      } catch (e: any) {
         console.log(e.response?.data?.message)
      }
   }

   async checkAuth() {
      this.setLoading(true)
      try {
         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
         console.log(response)
         localStorage.setItem('token', response.data.accessToken)
         this.setAuth(true)
         this.setUser(response.data.user)
      } catch (e: any) {
         console.log(e.response?.data?.message)
      } finally {
         this.setLoading(false)
      }
   }
}