import { useAuthStore } from "src/stores/auth-store";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const useLogin = () => {

  const authStore = useAuthStore();
  const username = ref("");
  const password = ref("");
  const isPwd = ref(true)
  const $q = useQuasar();
  const router = useRouter();

  const onSubmit = async () => {
    const login = await authStore.login(username.value, password.value);

    if (login) {
      router.push("/test");
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


  return {
    username,
    password,
    isPwd,
    onSubmit,
    onReset
  }
}

export default useLogin
