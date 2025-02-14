import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};


export const fetchOneBook = async(id) => {
    try {
        const response = await axios.get(`${API_URL}/api/books/${id}`)
        return response.data
    } catch (error) {
        console.error('Error fetching book:', error);
        return []
    }
}

export const fetchBookReviews = async (bookId) => {
    const response = await fetch(`${API_URL}/api/reviews/${bookId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    return response.json();
};