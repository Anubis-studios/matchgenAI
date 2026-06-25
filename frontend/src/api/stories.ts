import api from './client'

export const storiesApi = {
  getAll: () => api.get('/stories/'),
  getById: (id: number) => api.get(`/stories/${id}`),
  create: (data: any) => api.post('/stories/', data),
  update: (id: number, data: any) => api.put(`/stories/${id}`, data),
  delete: (id: number) => api.delete(`/stories/${id}`),
}
