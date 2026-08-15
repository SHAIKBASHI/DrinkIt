import api from "./api";

// Add Address
export const addAddress = async (address) => {

  const response = await api.post(
    "/addresses",
    address
  );

  return response.data;
};


// Get User Addresses
export const getUserAddresses = async (userId) => {

  const response = await api.get(
    `/addresses/user/${userId}`
  );

  return response.data;
};


// Get Address By ID
export const getAddressById = async (id) => {

  const response = await api.get(
    `/addresses/${id}`
  );

  return response.data;
};


// Update Address
export const updateAddress = async (id, address) => {

  const response = await api.put(
    `/addresses/${id}`,
    address
  );

  return response.data;
};


// Delete Address
export const deleteAddress = async (id) => {

  const response = await api.delete(
    `/addresses/${id}`
  );

  return response.data;
};