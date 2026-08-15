import axios from "axios";
import { getToken } from "./authService";

const API_URL =
  `${import.meta.env.VITE_API_URL}/cart`;


const getHeaders = () => ({
  headers: {
    Authorization:
      `Bearer ${getToken()}`
  }
});


// Create / Get Cart
export const createCart = async (userId) => {

  const response =
    await axios.post(
      `${API_URL}/create/${userId}`,
      {},
      getHeaders()
    );

  return response.data;
};


// Add Product
export const addProductToCart =
  async (cartItem) => {

    const response =
      await axios.post(
        `${API_URL}/add`,
        cartItem,
        getHeaders()
      );

    return response.data;
  };


// Get Cart Items
export const getCartItems =
  async (cartId) => {

    const response =
      await axios.get(
        `${API_URL}/${cartId}`,
        getHeaders()
      );

    return response.data;
  };


// Update Quantity
export const updateCartQuantity =
  async (id, quantity) => {

    const response =
      await axios.put(
        `${API_URL}/update/${id}/${quantity}`,
        {},
        getHeaders()
      );

    return response.data;
  };


// Delete Cart Item
export const deleteCartItem =
  async (id) => {

    const response =
      await axios.delete(
        `${API_URL}/delete/${id}`,
        getHeaders()
      );

    return response.data;
  };


// Clear Cart
export const clearCart =
  async (cartId) => {

    const response =
      await axios.delete(
        `${API_URL}/clear/${cartId}`,
        getHeaders()
      );

    return response.data;
  };


// Get Total
export const getCartTotal =
  async (cartId) => {

    const response =
      await axios.get(
        `${API_URL}/total/${cartId}`,
        getHeaders()
      );

    return response.data;
  };