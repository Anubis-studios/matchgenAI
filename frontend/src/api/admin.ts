import api from './client'

export const adminApi = {
  getAll: () => api.get('/admin/'),
  getById: (id: number) => api.get(`/admin/${id}`),
  create: (data: any) => api.post('/admin/', data),
  update: (id: number, data: any) => api.put(`/admin/${id}`, data),
  delete: (id: number) => api.delete(`/admin/${id}`),
}
