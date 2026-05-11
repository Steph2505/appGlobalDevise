import { reactive } from 'vue'

const toasts = reactive([])
let nextId = 0

export function useToast() {
  function show({ message, type = 'success', duration = 3500 }) {
    const id = ++nextId
    toasts.push({ id, message, type })
    setTimeout(() => {
      const index = toasts.findIndex((t) => t.id === id)
      if (index !== -1) toasts.splice(index, 1)
    }, duration)
  }

  return { toasts, show }
}
