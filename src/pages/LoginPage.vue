<script setup>

import useLogin from "src/composables/useLogin";

const { username, password, isPwd, onSubmit, onReset } = useLogin();


</script>

<template>
  <q-page class="flex flex-center">
    <div class="row q-pa-md justify-center items-center column" style="height: 100vh;">

      <div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 col-xl-2">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
          <h6 class="q-my-md">Datos de acceso</h6>
          <q-input filled v-model="username" label="Tu usuario o email *" hint="Mínimo 4, Máximo 30 caracteres" lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 4) ||
                'Ingresa tu usuario o email, minimo 4 caracteres',
              (val) =>
                val.length < 31 ||
                'Ingresa tu usuario o email, maximo 50 caracteres',
            ]" />

          <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Mínimo 6, Máximo 20 caracteres"
            label="Tu password *" lazy-rules :rules="[
              (val) => (val && val.length > 5) || 'Minimo 6 caracteres',
              (val) => val.length < 21 || 'Maximo 20 caracteres',
            ]">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <div>
            <q-btn label="Submit" type="submit" color="amber-10" />
            <q-btn label="Reset" type="reset" color="black" class="q-ml-sm" />
          </div>
        </q-form>
        <q-separator class="q-my-sm" />
        <q-btn to="/recover" icon="key" flat label="Olvido su password" class="col-4 q-mt-xs" />
        <q-btn to="/signup" icon="person" flat label="Registrate" class="col-4 q-mt-xs" />
      </div>
    </div>
  </q-page>
</template>
