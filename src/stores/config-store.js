import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useConfigStore = defineStore('config', {
  state: () => ({
    quantity: 0,
    unit: '',
  }),
  getters: {

  },
  actions: {
    async getConfig() {
      try {
        const config = await api.get('/config')
        console.log(config.data)
      } catch (error) {
        console.log(error)
      }

    }
  },
});
