import api from "./api";

// Get user's wishlist
export const getWishlist = async (userId) => {

  const response = await api.get(
    `/wishlist/user/${userId}`
  );

  return response.data;
};


// Add product to wishlist
export const addToWishlist = async (
  userId,
  productId
) => {

  const response = await api.post(
    `/wishlist?userId=${userId}&productId=${productId}`
  );

  return response.data;
};


// Remove product
export const removeFromWishlist = async (
  userId,
  productId
) => {

  const response = await api.delete(
    `/wishlist?userId=${userId}&productId=${productId}`
  );

  return response.data;
};


// Check product
export const checkWishlist = async (
  userId,
  productId
) => {

  const response = await api.get(
    `/wishlist/check?userId=${userId}&productId=${productId}`
  );

  return response.data;
};