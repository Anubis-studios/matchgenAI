import api from './client'

export const aiApi = {
  getAll: () => api.get('/ai/'),
  getById: (id: number) => api.get(`/ai/${id}`),
  create: (data: any) => api.post('/ai/', data),
  update: (id: number, data: any) => api.put(`/ai/${id}`, data),
  delete: (id: number) => api.delete(`/ai/${id}`),
}
