<script setup>
import {socket} from 'src/utils/sock'
import { ref, watch, onMounted } from 'vue'

const test = ref('')
const enviar = () => {
  socket.emit('test', 'hola')
}
console.log(socket)
</script>
<template>
  <div>
    <q-btn label="test" @click="enviar"/>
  </div>
</template>



<style lang="scss" scoped>

</style>
