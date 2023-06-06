import { ref, onMounted } from 'vue'
import { useConfigStore } from 'src/stores/config-store'


const useConfig = () => {

const useConfigSt = useConfigStore()

const minutes = ref('')
const counter = ref(0)
const model = ref('')
const options = ['Hora', 'Minuto', 'Segundo']

onMounted(() => {
  useConfigSt.getConfig()
})

const setTime = () => {
  restartTime()
  counter.value = minutes.value
  decrementCounter()
}
let interval

const decrementCounter = () => {

  interval = setInterval(() => {
    counter.value--
    if(counter.value === 0){
      clearInterval(interval)
    }
  }, 1000)
}

const restartTime = () => {
  counter.value = 0
  clearInterval(interval)
  useConfigSt.getConfig()
}

return {
  minutes,
  counter,
  setTime,
  restartTime,
  model,
  options
}

}

export default useConfig
