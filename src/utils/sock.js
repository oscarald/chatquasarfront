import { io } from 'socket.io-client';
/* import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended'; */

const socket = io('http://192.168.0.189:3002', { transports: ['websocket'] });

//const socket = 'socket'
export {socket};
/* const test = 'hola';

export default test; */
