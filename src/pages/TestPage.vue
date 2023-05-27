<script setup>
import {socket} from 'src/utils/sock'
import { ref, watch, onMounted } from 'vue'
import useCounter from 'src/composables/useCounter';
import { useAuthStore } from 'src/stores/auth-store';

const {token, refreshToken} = useAuthStore();

const { count, increment, decrement } = useCounter();

const number = ref(false)

const enviar = () => {
  socket.emit('test', 'hola')
}
console.log(socket)

const incNumber = async (time) => {

  setTimeout(() => {
    if(number.value){

      console.log('se ejecuto')
    }

  }, 2000)
}

const start = () => {
  incNumber()
}
const change = () => {
  number.value = !number.value
}

const refresh = () => {
  refreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZlNWM5ZTA5MDgzZWQyMWVlNjYxYWIiLCJpYXQiOjE2ODUyMDM2NzksImV4cCI6MTY4NTIwNDU3OX0.DGoMIo8fPmA5g5uK1jQ16GUsxMpvdJ5x9Cs_C82tge0")
}
</script>
<template>
  <div>
    <div class="flex flex-center">
    <q-btn label="test" @click="enviar"/>
    <div>
      {{ count }}
      <q-btn label="+" @click="increment"/>
      <q-btn label="-" @click="decrement"/>
      {{ token }}
    </div>
  </div>
  <div class="flex flex-center">
    <q-btn label="Iniciar" @click="start"/>
    <q-btn label="cambiar" @click="change"/>
    {{number}}
  </div>
  <div class="flex flex-center">
    <q-btn label="Refresh" @click="refresh"/>

    {{number}}
  </div>

  </div>
</template>



<style lang="scss" scoped>

</style>
