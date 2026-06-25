import api from './client'

export const authApi = {
  getAll: () => api.get('/auth/'),
  getById: (id: number) => api.get(`/auth/${id}`),
  create: (data: any) => api.post('/auth/', data),
  update: (id: number, data: any) => api.put(`/auth/${id}`, data),
  delete: (id: number) => api.delete(`/auth/${id}`),
}
