/* import io from 'socket.io-client';

export default ({ Vue }) => {
  const socket = io('http://localhost:3002'); // Reemplaza la URL con la del servidor de sockets

  // Configuración adicional (opcional)
  // socket.on(...);
  // socket.emit(...);

  Vue.prototype.$socket = socket;
};
 */

import { io } from 'socket.io-client';
import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';

const socket = io('http://192.168.0.189:3002', { transports: ['websocket'] });

export { socket };

/* export default async ({ store, Vue }) => {
  Vue.use(VueSocketIOExt, socket, { store })
} */
