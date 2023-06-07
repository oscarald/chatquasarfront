<script setup>
import { onMounted } from 'vue';
import { useConfigStore } from 'src/stores/config-store'
import useConfig from 'src/composables/useConfig';

const { minutes, counter, setTime, restartTime, model, options, timeToken, timeRefreshToken, typeToken, inputRef } = useConfig();
const useConfigSt = useConfigStore()
onMounted(() => {
  //console.log('ConfigComp mounted');
  //useConfigSt.getConfig()
});

</script>

<template>
  <div class="flex flex-center q-mt-md" >
    <div>
      <div class="text-h4">
      Configuraciones
      </div>
      <div>
        Configuracion actual token: {{ timeToken.time + ' '+timeToken.unitTime }}

      </div>
      <div class="q-mb-md">
        Configuracion actual refreshToken: {{ timeRefreshToken.time + ' '+timeRefreshToken.unitTime }}
      </div>
      <div class="text-h5">
        Configurar el tiempo de token
      </div>
      <q-form @submit="setTime" style="width: 400px;" ref="inputRef">
        <div class="q-gutter-sm">
          <q-radio v-model="typeToken" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="token" label="Token" />
          <q-radio v-model="typeToken" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="refresh" label="Refresh" />

        </div >
        <q-input
        filled
        v-model="minutes"
        label="Tiempo"
        class="q-mb-sm"
        :rules="[val => !!val || 'Este campo es obligatorio']"

        />
        <q-select outlined v-model="model" :options="options" label="Unidad de tiempo"  class="q-my-md"/>
        <q-btn
          color="primary"
          label="Send"
          type="submit"/>
          <q-btn
          color="primary"
          label="Reset"
          @click="restartTime"
          class="q-ml-sm"/>

      </q-form>
      <div>

      </div>
    </div>

  </div>
</template>



<style lang="scss" scoped>

</style>
