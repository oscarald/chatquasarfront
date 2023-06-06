<script setup>
import useConfig from 'src/composables/useConfig';

const { minutes, counter, setTime, restartTime, model, options } = useConfig();
</script>

<template>
  <div class="flex flex-center q-mt-md" >
    <div>
      <div class="text-h4">
      Configuraciones
      </div>
      <div>
        Configuracion actual token:

      </div>
      <div>
        Configuracion actual refreshToken:
      </div>
      <q-form @submit="setTime" style="width: 400px;">
        <q-input
        filled
        v-model="minutes"
        label="Minutos"

        />
        <q-select outlined v-model="model" :options="options" label="Minuto" />
        <q-btn
          color="primary"
          label="Send"
          type="submit"/>
          <q-btn
          color="primary"
          label="Restart"
          @click="restartTime"
          class="q-ml-sm"/>

      </q-form>
      <div>
        {{ counter }} : {{ minutes }}
      </div>
    </div>

  </div>
</template>



<style lang="scss" scoped>

</style>
