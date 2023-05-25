import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const useAuthStore = defineStore('counter', {
  state: () => ({
    username: '',
    idUser: '',
    test : false,

  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async signin (username, password){
      try {
        const user = await api.post('/chat/login', {username, password})
        console.log(user.data)
        return true
      } catch (error) {
        console.log(error)
      }
    },
    async login (username, password){
      try {
        const user = await api.post('/chat/login', {username, password})
        console.log(user.data)
        this.username = user.data.username
        this.idUser = user.data._id
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
  },
});
