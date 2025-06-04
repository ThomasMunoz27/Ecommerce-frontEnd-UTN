import { create } from "zustand"
import { persist } from "zustand/middleware"

interface useStoreLogin {
  token: string
  setToken: (newToken: string) => void
  deleteToken: () => void
}



export const useStoreLogin = create<useStoreLogin>()(
  persist(
    (set) => ({
      token: '',
      setToken: (newToken: string) => set({ token: newToken }),
      deleteToken: () => {
        set({token: ''})
        localStorage.removeItem('token')
      }
    }),
    {
      name: 'token', // nombre de la clave en localStorage
    }
  )
)
