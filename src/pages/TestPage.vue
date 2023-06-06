<script setup>
import {socket} from 'src/utils/sock'
import { ref, watch, onMounted } from 'vue'
import useCounter from 'src/composables/useCounter';
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from "vue-router";
const router = useRouter();

const {token, refreshToken, test, proting, servidor} = useAuthStore();

const authStore = useAuthStore()

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
  refreshToken()
}

const probandoando = () => {
  proting()
}

const cambiarRuta = () => {
  router.push("/chat");
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
    <q-btn label="Refresh token" @click="refresh"/>

    {{number}}
  </div>
  <div class="flex flex-center">
    <q-btn label="Verificar token" @click="probandoando"/>
    {{ authStore.servidor }}

  </div>

  <div class="flex flex-center">
    <q-btn label="ir al chat" @click="cambiarRuta"/>
    {{ authStore.servidor }}

  </div>

  </div>
</template>



<style lang="scss" scoped>

</style>
