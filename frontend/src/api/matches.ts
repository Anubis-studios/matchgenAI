import api from './client'

export const matchesApi = {
  getAll: () => api.get('/matches/'),
  getById: (id: number) => api.get(`/matches/${id}`),
  create: (data: any) => api.post('/matches/', data),
  update: (id: number, data: any) => api.put(`/matches/${id}`, data),
  delete: (id: number) => api.delete(`/matches/${id}`),
}
