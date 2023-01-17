// Создание, удаление, поиск и т.д. для работы с пользователями
const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')

class UserService {
   async registration(email, password) {
      // Проверяем наличие в БД пользователя с таким же емейлом
      const candidate = await UserModel.findOne({email})
      if (candidate) {
         throw new Error(`Пользователь с адресом ${email} уже существует`)
      }

      // хеширование пароля
      const hashPassword = await bcrypt.hash(password, 3)
      // генерирование ссылки для активации аккауна и подтверждения емейла
      // вызовом функции, которая вернет уникальную строку
      const activationLink = uuid.v4  //v34fa-asfasf-142saf-sa-asf
      // сохранение пользователя в базу данных
      const user = await UserModel.create({email, password: hashPassword, activationLink})

      // отправка на имейл пользователю письмо для активации
      await mailService.sendActivationMail(email, activationLink)

      const userDto = new UserDto(user) // id, email,isActivated
      // получение токенов аксесс и рефреш путем разворачивания userDto оператором spread
      const tokens = tokenService.generateTokens({...userDto})
      // сохраняем рефреш-токен в базу данных
      await tokenService.saveToken(userDto.id, tokens.refreshToken)

      return { ...tokens, user: userDto }
   }
}

module.exports = new UserService