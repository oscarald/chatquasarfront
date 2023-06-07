import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useConfigStore = defineStore('config', {
  state: () => ({
    quantity: 0,
    unit: '',
    timeToken: '',
    timeRefreshToken: '',
  }),
  getters: {

  },
  actions: {
    async getConfig() {
      try {
        const config = await api.get('/config')
        this.timeToken = config.data.timeToken
        this.timeRefreshToken = config.data.timeRefreshToken

        console.log(config.data)
      } catch (error) {
        console.log(error)
      }

    },
    async setConfig (type, time, unitTime) {
      let val
      switch (unitTime) {
        case 'Hora':
          val = 'h'
          break;
        case 'Minuto':
          val = 'm'
          break;
        case 'Segundo':
          val = 's'
          break;
        default:
          break;
      }
      //console.log(`/config/${type}`,{time, unitTime: val})
      const config = await api.post(`/config/${type}`, {time, unitTime: val})

      if(type === 'token'){
        //console.log(config.data)
        this.timeToken = config.data
      } else {
        this.timeRefreshToken = config.data
      }
      /* this.timeToken = config.data.timeToken
      this.timeRefreshToken = config.data.timeRefreshToken */
    },
  },
});
