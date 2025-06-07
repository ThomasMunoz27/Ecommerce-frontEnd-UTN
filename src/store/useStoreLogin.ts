import { create } from "zustand"
import { persist } from "zustand/middleware"

interface useStoreLogin {
  token: string
  setToken: (newToken: string) => void
}

export const useStoreLogin = create<useStoreLogin>()(
  persist(
    (set) => ({
      token: '',
      setToken: (newToken: string) => set({ token: newToken }),
    }),
    {
      name: 'token', // nombre de la clave en localStorage
    }
  )
)
