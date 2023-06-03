import { defineStore } from 'pinia';
import { api } from 'boot/axios'
import axios from 'axios';

export const useAuthStore = defineStore('counter', {
  state: () => ({
    username: '',
    idUser: '',
    test : false,
    token: 'test',
    servidor: 'hi'

  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
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
        const user = await api.post('http://localhost:3002/auth/login', {username, password})

        console.log(user.headers)
        /* this.username = user.data.username
        this.idUser = user.data._id */
        this.token = user.data.token
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
        console.log(refresh.data)
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
        const test = await api.get('/auth/testing',{headers: {Data: 'data123'}})
        //const test = await fetch('http://localhost:3002/auth/testing')
        //var datos = test.headers.get('X-Data');
        console.log(test.headers['x-data'])
        this.servidor = test.headers['x-data']
        //const info = await test.json()
        //console.log(info)
      } catch (error) {
        console.log(error)
      }
    },

  },
});
