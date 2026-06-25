import api from './client'

export const giftsApi = {
  getAll: () => api.get('/gifts/'),
  getById: (id: number) => api.get(`/gifts/${id}`),
  create: (data: any) => api.post('/gifts/', data),
  update: (id: number, data: any) => api.put(`/gifts/${id}`, data),
  delete: (id: number) => api.delete(`/gifts/${id}`),
}
