import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;


// =========================================================
// REGISTER
// =========================================================

const register = async (userData) => {

  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};


// =========================================================
// LOGIN
// =========================================================

const login = async (loginData) => {

  const response = await axios.post(
    `${API_URL}/login`,
    loginData
  );

  return response.data;
};


// =========================================================
// UPDATE PROFILE
// Updates name/email in backend
// =========================================================

const updateProfile = async (profileData) => {

  const token = getToken();

  if (!token) {
    throw new Error(
      "Authentication token not found."
    );
  }

  const response = await axios.put(
    `${API_URL}/profile`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
};


// =========================================================
// SAVE AUTH DATA
// Stores user + JWT
// =========================================================

const saveAuthData = (data) => {

  localStorage.setItem(
    "token",
    data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
      role: data.role
    })
  );
};


// =========================================================
// GET TOKEN
// =========================================================

const getToken = () => {

  return localStorage.getItem(
    "token"
  );
};


// =========================================================
// GET USER
// =========================================================

const getUser = () => {

  const user =
    localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {

    return JSON.parse(user);

  } catch (error) {

    console.error(
      "Invalid saved user data:",
      error
    );

    localStorage.removeItem("user");

    return null;
  }
};


// =========================================================
// LOGOUT
// =========================================================

const logout = () => {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );
};


// =========================================================
// CHECK LOGIN
// =========================================================

const isLoggedIn = () => {

  return !!getToken();

};


// =========================================================
// EXPORT
// =========================================================

export {
  register,
  login,
  updateProfile,
  saveAuthData,
  getToken,
  getUser,
  logout,
  isLoggedIn
};