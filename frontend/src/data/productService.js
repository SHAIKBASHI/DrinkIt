import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/products`;


// =========================================
// GET ALL PRODUCTS
// =========================================

export const getProducts = async () => {

  const response = await axios.get(API_URL);

  return response.data;
};


// =========================================
// GET PRODUCT BY ID
// =========================================

export const getProductById = async (id) => {

  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};


// =========================================
// GET PRODUCTS BY CATEGORY
// =========================================

export const getProductsByCategory = async (category) => {

  const response = await axios.get(
    `${API_URL}/category/${encodeURIComponent(category)}`
  );

  return response.data;
};


// =========================================
// SEARCH PRODUCTS
// =========================================

export const searchProducts = async (keyword) => {

  const response = await axios.get(
    `${API_URL}/search/${encodeURIComponent(keyword)}`
  );

  return response.data;
};


// =========================================
// GET TRENDING PRODUCTS
// =========================================

export const getTrendingProducts = async () => {

  const response = await axios.get(
    `${API_URL}/trending`
  );

  return response.data;
};


// =========================================
// GET RECOMMENDED PRODUCTS
// =========================================

export const getRecommendedProducts = async () => {

  const response = await axios.get(
    `${API_URL}/recommended`
  );

  return response.data;
};


// =========================================
// ADD PRODUCT
// =========================================

export const addProduct = async (product) => {

  const response = await axios.post(
    API_URL,
    product
  );

  return response.data;
};


// =========================================
// UPDATE PRODUCT
// =========================================

export const updateProduct = async (id, product) => {

  const response = await axios.put(
    `${API_URL}/${id}`,
    product
  );

  return response.data;
};


// =========================================
// DELETE PRODUCT
// =========================================

export const deleteProduct = async (id) => {

  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};