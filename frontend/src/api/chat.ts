import api from './client'

export const chatApi = {
  getAll: () => api.get('/chat/'),
  getById: (id: number) => api.get(`/chat/${id}`),
  create: (data: any) => api.post('/chat/', data),
  update: (id: number, data: any) => api.put(`/chat/${id}`, data),
  delete: (id: number) => api.delete(`/chat/${id}`),
}
