import axios from "axios";

export const api = axios.create({
  baseURL: 'https://shelf-zeta.vercel.app',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleApiError = (error) => {
  const message = error.response?.data?.error || "An unexpected error occurred";
  console.error("API Error:", message);
  return message;
};

export const fetchBooks = async () => {
  try {
    const response = await api.get('/api/books');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchOneBook = async (id) => {
  try {
    const response = await api.get(`/api/books/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const addBook = async (bookData) => {
  try {
    const response = await api.post('/api/books', bookData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchBookReviews = async (bookId) => {
  try {
    const response = await api.get(`/api/reviews/${bookId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchProfile = async(userId) => {
  try {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export const submitReview = async (reviewData) => {
  try {
    const response = await api.post("/api/reviews", reviewData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const response = await api.put(`/api/users/${userId}`, updateData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};