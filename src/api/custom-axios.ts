import { router } from '@/router'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

export const customAxios = <Res = unknown, Req = unknown>(
  cfg: AxiosRequestConfig & { data?: Req },
): Promise<AxiosResponse<Res>> => {
  const instance = axios.create({
    baseURL: import.meta.env.PROD ? '/' : import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
  })

  instance.interceptors.request.use((c) => {
    const token = localStorage.getItem('token')
    if (token) {
      c.headers = c.headers ?? {}
      c.headers.Authorization = `Bearer ${token}`
    }
    return c
  })

  instance.interceptors.response.use(
    (r) => r,
    (e) => {
      if (e.response?.status === 401) {
        localStorage.removeItem('token')
        router.replace('/login')
      }
      return Promise.reject(e)
    },
  )

  return instance.request<Res>({ ...cfg })
}
