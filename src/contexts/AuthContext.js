import React, { createContext, useContext, useState } from 'react';

// create a new context object
const AuthContext = createContext();

// define a provider component that wraps the entire app
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // function to log in a user
  function login(email, password) {
    // your login logic here...
    setUser({ email });
  }

  // function to log out a user
  function logout() {
    // your logout logic here...
    setUser(null);
  }

  // expose the user, login and logout functions to child components
  const value = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook to use the AuthContext in any child component
function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
