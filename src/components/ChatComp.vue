<script setup>

import { ref, watch, onMounted } from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import { useAuthStore } from "src/stores/auth-store";
import { useRouter } from "vue-router";
const router = useRouter();

const authStore = useAuthStore();
const socket = io('http://192.168.0.189:3002', { transports: ['websocket'] });

//console.log(sock)
/* socket.on('connect', () => {
  console.log('connected');
}); */
const message = ref('')
const messages = ref([])
const id = ref('')

const sendMessage = async () => {
  //socket.emit('chat', message.value);
  authStore.chat(message.value)

  message.value = '';
  //messages.value = [{ name: 'Me', text: message.value }, ...messages.value];
};
const cambiarRuta = () => {
  router.push("/test");
}

onMounted(() => {
  socket.on('chat', (msg) => {
    console.log(msg)
    //msg.name = 'Me'
    if(msg.id == authStore.idUser){
      msg.name = 'Me'
    }
    messages.value = [msg ,...messages.value];
  });
});

</script>
<template>
  <div>
    <div>
      Bienvenido: {{ authStore.username  }}
    </div>
    <q-form @submit="sendMessage">
      <q-input
        filled
        v-model="message"
        label="Message"

      />
      <q-btn
      color="primary"
      label="Send"
      type="submit"/>
    </q-form>
    <div style="max-width: 400px; max-height: 300px; ">
      <div v-for="msg in messages">
      <q-chat-message

        :name="msg.name"
        :text="[msg.text]"
        :sent="msg.name === 'Me'"
      />
    </div>



    </div>
    <q-btn label="cambiar" @click="cambiarRuta"/>
  </div>
</template>



<style lang="scss" scoped>

</style>
