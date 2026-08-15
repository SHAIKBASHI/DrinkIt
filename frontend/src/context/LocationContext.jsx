import React, { createContext, useContext, useState, useEffect } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {

  const [location, setLocation] = useState("");

  useEffect(() => {
    const savedLocation = localStorage.getItem("drinkit-location");

    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem("drinkit-location", newLocation);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        updateLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}