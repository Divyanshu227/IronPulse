import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || '/api'

export const api = axios.create({
  baseURL: apiBaseUrl.replace(/\/$/, '')
})