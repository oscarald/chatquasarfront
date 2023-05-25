<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth-store";


const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const isPwd = ref(true)

const onSubmit = async () => {
  const login = await authStore.login(username.value, password.value);

  if (login) {
    router.push("/chat");
  } else {
    $q.notify({
      type: "negative",
      message: "Usuario o contraseña incorrectos",
    });
  }
}

const onReset = () => {
  username.value = null;
  password.value = null;
}

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
