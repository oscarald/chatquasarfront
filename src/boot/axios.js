import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth-store';
import axios from 'axios'

const {token} = useAuthStore();
//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create(

  {
    baseURL: 'http://localhost:3002',
    headers: {

      'Content-Type': 'application/json',
    },
    /* headers: {
      //Authorization: `Bearer ${localStorage.getItem('token')}`
      //'Authorization': `Bearer ${token}`
    }, */
    withCredentials: true,

  },

  )

api.interceptors.request.use(
  request => {
    request.headers.Authorization = `Bearer ${token}`
    return request
  }
)


export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
