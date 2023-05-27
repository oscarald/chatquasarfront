import { ref } from 'vue'


const useCounter = () => {
  const count = ref(10)

  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  return {
    count,
    increment,
    decrement
    }

}

export default useCounter
