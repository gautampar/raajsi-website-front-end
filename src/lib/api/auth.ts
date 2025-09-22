import api from "./api";


export const login = async (email, password) => {
  try {
    const response = await api.post("user/signin", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get("product/category/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductsByCategory = async (slug) => {
  try {
    const response = await api.get(`/product/category/${slug}`);
    return response.data; // array of products
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getFaqs = async () => {
    try {
      const response = await api.get("faq/all");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

export const getAllProducts = async () => {
  try {
    const response = await api.get("product/all");
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};