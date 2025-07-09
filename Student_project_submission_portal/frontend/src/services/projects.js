import api from '../utils/api';

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProject = async (title, description) => {
  const response = await api.post('/projects', { title, description });
  return response.data;
};

export const updateProject = async (id, title, description) => {
  const response = await api.put(`/projects/${id}`, { title, description });
  return response.data;
};

export const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
};
export const getProject = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};