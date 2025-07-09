import api from '../utils/api';

export const getFeedback = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/feedback`);
  return response.data;
};

export const addFeedback = async (projectId, comment, rating) => {
  const response = await api.post(`/projects/${projectId}/feedback`, {
    comment,
    rating,
  });
  return response.data;
};