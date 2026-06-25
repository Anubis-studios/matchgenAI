import api from './client'

export const profilesApi = {
  getAll: () => api.get('/profiles/'),
  getById: (id: number) => api.get(`/profiles/${id}`),
  create: (data: any) => api.post('/profiles/', data),
  update: (id: number, data: any) => api.put(`/profiles/${id}`, data),
  delete: (id: number) => api.delete(`/profiles/${id}`),
}
