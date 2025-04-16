import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const UserIdAppContext = createContext();
const UserAppContext = createContext();
const LocalesContext = createContext();
const LocalInfoContext = createContext();
const FligthDataContext = createContext(); 

export function useUserIdAppContext() {
  return useContext(UserIdAppContext);
}
export function useUserAppContext() {
  return useContext(UserAppContext);
}

export function useLocalesContext() {
  return useContext(LocalesContext);
}
export function useLocalInfoContext() {
  return useContext(LocalInfoContext);
}

export function useFligthDataContext() {
  return useContext(FligthDataContext);
}
// Crear el proveedor de contexto
export const AppProvider = ({ children }) => {
  const [userIdApp, setUserIdApp] = useState(null); // Estado de userId
  const [userData, setUserData] = useState(null); // Estado de userId
  const [locales, setLocales] = useState([]); // Estado de locales
  const [localInfo, setLocalInfo] = useState(null); // Estado de información del local
  const [fligthData, setFligthData] = useState(null); // Estado de información del vuelo
//   const [theme, setTheme] = useState('light'); // Estado de tema (ejemplo)
//   const [userRole, setUserRole] = useState('user'); // Estado de rol de usuario

  // Proveer el contexto con todos los valores y sus setters
  return (
    <UserIdAppContext.Provider value = {[userIdApp, setUserIdApp]}>
      <FligthDataContext.Provider value = {[fligthData, setFligthData]}>
      <UserAppContext.Provider value = {[userData, setUserData]}>
        <LocalesContext.Provider value = {[locales, setLocales]}>
          <LocalInfoContext.Provider value = {[localInfo, setLocalInfo]}>
            {children}
          </LocalInfoContext.Provider>
        </LocalesContext.Provider>
      </UserAppContext.Provider>
      </FligthDataContext.Provider>
    </UserIdAppContext.Provider>
  );
};

