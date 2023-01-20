import { makeAutoObservable } from "mobx";
import { IUser } from "../models/iuser";
import AuthService from "../services/auth-service";

export default class Store {
   user = {} as IUser
   isAuth = false             // true if authorized

   constructor() {            // call 'mobx'
      makeAutoObservable(this)
   }

   setAuth(bool: boolean) {   // change current value with params
      this.isAuth = bool
   }

   setUser(user: IUser) {     // change current value with params
      this.user = user
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
         this.setAuth(true)
         this.setUser(response.data.user)
      } catch (e: any) {
         console.log(e.response?.data?.message)
         
      }
   }

   async logout() {
      try {
         const response = await AuthService.logout()
         console.log(response);
         localStorage.removeItem('token')
         this.setAuth(false)
         this.setUser({} as IUser)
         // ---???
      } catch (e: any) {
         console.log(e.response?.data?.message)
         
      }
   }
}