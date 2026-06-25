import api from './client'

export const voiceApi = {
  getAll: () => api.get('/voice/'),
  getById: (id: number) => api.get(`/voice/${id}`),
  create: (data: any) => api.post('/voice/', data),
  update: (id: number, data: any) => api.put(`/voice/${id}`, data),
  delete: (id: number) => api.delete(`/voice/${id}`),
}
