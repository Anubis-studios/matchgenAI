import api from './client'

export const filtersApi = {
  getAll: () => api.get('/filters/'),
  getById: (id: number) => api.get(`/filters/${id}`),
  create: (data: any) => api.post('/filters/', data),
  update: (id: number, data: any) => api.put(`/filters/${id}`, data),
  delete: (id: number) => api.delete(`/filters/${id}`),
}
