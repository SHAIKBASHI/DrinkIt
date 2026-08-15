import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  getUser,
  getToken,
  saveAuthData,
  logout as logoutUser
} from "../data/authService";


const AuthContext = createContext();


export const useAuth = () => {

  return useContext(AuthContext);

};


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // =========================================================
  // LOAD SAVED LOGIN
  // =========================================================

  useEffect(() => {

    const token = getToken();

    const savedUser = getUser();


    if (token && savedUser) {

      setUser(savedUser);

    }


    setLoading(false);

  }, []);


  // =========================================================
  // LOGIN / REGISTER
  // =========================================================

  const loginUser = (data) => {

    saveAuthData(data);


    setUser({

      userId: data.userId,

      fullName: data.fullName,

      email: data.email,

      mobile: data.mobile,

      role: data.role

    });

  };


  // =========================================================
  // UPDATE USER
  // Used after editing profile
  // =========================================================

  const updateUser = (data) => {

    /*
     * Backend returns a NEW JWT
     * after changing email/name.
     *
     * Save the new token and
     * updated user information.
     */

    saveAuthData(data);


    setUser({

      userId: data.userId,

      fullName: data.fullName,

      email: data.email,

      mobile: data.mobile,

      role: data.role

    });

  };


  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {

    logoutUser();

    setUser(null);

  };


  // =========================================================
  // CONTEXT
  // =========================================================

  return (

    <AuthContext.Provider
      value={{

        user,

        setUser,

        loginUser,

        updateUser,

        logout,

        loading,

        isLoggedIn: !!user

      }}
    >

      {children}

    </AuthContext.Provider>

  );

};