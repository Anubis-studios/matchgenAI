import api from './client'

export const eventsApi = {
  getAll: () => api.get('/events/'),
  getById: (id: number) => api.get(`/events/${id}`),
  create: (data: any) => api.post('/events/', data),
  update: (id: number, data: any) => api.put(`/events/${id}`, data),
  delete: (id: number) => api.delete(`/events/${id}`),
}
