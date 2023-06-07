import { ref, onMounted } from 'vue'
import { useConfigStore } from 'src/stores/config-store'
import { storeToRefs } from 'pinia'


const useConfig = () => {

const useConfigSt = useConfigStore()
const {timeToken, timeRefreshToken} = storeToRefs(useConfigSt)

const typeToken = ref('token')
const minutes = ref('')
const counter = ref(0)
const model = ref('Minuto')
const options = ['Hora', 'Minuto', 'Segundo']
const inputRef = ref(null)



onMounted( () => {
  useConfigSt.getConfig()

})

const setTime = () => {
  useConfigSt.setConfig(typeToken.value, minutes.value, model.value)
  minutes.value = ''
  restartTime()
  /* restartTime()
  counter.value = minutes.value
  decrementCounter() */
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

  inputRef.value.resetValidation()
  /* counter.value = 0
  clearInterval(interval)
  useConfigSt.getConfig() */
}

return {
  minutes,
  counter,
  setTime,
  restartTime,
  model,
  options,
  timeToken : timeToken ,
  timeRefreshToken : timeRefreshToken,
  typeToken,
  inputRef
}

}

export default useConfig
