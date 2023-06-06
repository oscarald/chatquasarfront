import { defineStore } from 'pinia';
import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'
//import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    idUser: '',
    test : false,
    token: '',
    servidor: 'hi',
    expiration: '',
    tokenExpiration: 60,

  }),
  getters: {

  },
  actions: {
    async signin (username, password){
      try {
        const user = await api.post('/auth/login', {username, password})
        console.log(user.data)
        return true
      } catch (error) {
        console.log(error)
      }
    },
    async login (username, password){
      try {
        //const user = await api.post('/auth/login', {username, password}, {withCredentials: true})
        //const headers = user.headers
        const user = await api.post('/auth/login', {username, password})
        this.renewToken(user.headers)
        //console.log(user.headers['x-data'])
        /* this.username = user.data.username
        this.idUser = user.data._id */
        //this.token = user.headers['x-data']
        return true
      } catch (error) {
        console.log(error)
      }
    },
    async chat (message){
      try {
        const msg = await api.post('/chat/message', {message, id: this.idUser})
        console.log(msg.data)

      } catch (error) {
        console.log(error)
      }
    },
    async refreshToken (){
      try {
        const refresh = await api.post('/auth/refresh')
        this.renewToken(refresh.headers)
        console.log(refresh.data)
        //console.log(refresh.headers)
      } catch (error) {
        console.log(error)
      }
    },
    async test() {
      try {
        const test = await api.post('/auth/test', {user:'user'})
        console.log(test.data)
      } catch (error) {
        console.log(error)
      }
    },
    async proting () {
      try {
        //console.log(this.token)
        const test = await api.get('/auth/testing')
        //const test = await fetch('http://localhost:3002/auth/testing')
        this.renewToken(test.headers)
        //var datos = test.headers.get('X-Data');
        console.log(test.data)
        this.servidor = test.headers['x-data']
        //const info = await test.json()
        //console.log(info)
      } catch (error) {
        console.log(error.headers)
        console.log(error)
      }
    },
    renewToken (headers) {
      //console.log(headers)
      this.token = headers['x-data']
      this.expiration = headers['x-time']
      LocalStorage.set('expiration', this.expiration)

    },
    interceptors () {
      api.interceptors.request.use((config) => {
        config.headers.Authorization = 'Bearer ' + this.token
        return config
      })
    },
    async checkTimeRefresh  () {
      const nowDate = new Date()
      const exp = parseInt(LocalStorage.getItem('expiration'))
      const afterDate = nowDate.getTime()
      //console.log('after',afterDate)

      if(exp > afterDate){
        await this.refreshToken()
        return true
        //console.log('token valido')
      } else {
        this.token = ''
        return false
      }

    },

  },
});
