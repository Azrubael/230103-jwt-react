const userService = require('../service/user-service')

class UserController {
   async registration(req, res, next) {
      try {
         const { email, password } = req.body
         const userData = await userService.registration(email, password)
         // рефреш токен будет храниться в куках, для єтого передаем имя поля
         // и само куки
         res.cookie('refreshToken', userData.refreshToken,
            {maxAge: 30*24*60*60*1000, httpOnly: true})
         return res.json(userData)
      } catch(e) {
         console.log(e)
      }
   }

   async login(req, res, next) {
      try {

      } catch(e) {

      }
   }

   async logout(req, res, next) {
      try {

      } catch(e) {

      }
   }

   async activate(req, res, next) {
      try {
         const activationLink = req.params.link
         await userService.activate(activationLink)
         //редирект хоста на фронтенд при помощи express
         // return res.redirect(process.env.API_URL)
         return res.redirect(process.env.CLIENT_URL)
      } catch(e) {
         console.log(e)
      }
   }

   async refresh(req, res, next) {
      try {

      } catch(e) {

      }
   }

   async getUsers(req, res, next) {
      try {
         res.json(['777', '999'])
      } catch(e) {

      }
   }
}
module.exports = new UserController() 