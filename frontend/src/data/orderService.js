import api from "./api";

// Place Order
export const placeOrder = async (orderData) => {
  const response = await api.post(
    "/orders",
    orderData
  );

  return response.data;
};


// Add Order Item
export const addOrderItem = async (orderItem) => {
  const response = await api.post(
    "/orders/item",
    orderItem
  );

  return response.data;
};


// Get All Orders
export const getAllOrders = async () => {
  const response = await api.get(
    "/orders"
  );

  return response.data;
};


// Get Order By ID
export const getOrderById = async (id) => {
  const response = await api.get(
    `/orders/${id}`
  );

  return response.data;
};


// Get Orders By User
export const getOrdersByUser = async (userId) => {
  const response = await api.get(
    `/orders/user/${userId}`
  );

  return response.data;
};


// Get Order Items
export const getOrderItems = async (orderId) => {
  const response = await api.get(
    `/orders/items/${orderId}`
  );

  return response.data;
};


// Update Order Status
export const updateOrderStatus = async (
  id,
  status
) => {
  const response = await api.put(
    `/orders/status/${id}/${status}`
  );

  return response.data;
};


// Delete Order
export const deleteOrder = async (id) => {
  const response = await api.delete(
    `/orders/${id}`
  );

  return response.data;
};