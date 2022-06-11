import { createContext, useContext } from "react";
import { useGoogleFirebaseAuth } from "../firebase/useGoogleFirebaseAuth";

// NOTE: Creating a new auth user context with initial values
const GoogleAuthContext = createContext({
  authUser: null,
  loading: true,
  setAuthUser: () => {},
});

export const GoogleAuthUserProvider = ({ children }) => {
  const auth = useGoogleFirebaseAuth();

  return (
    <GoogleAuthContext.Provider value={auth}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

// NOTE: custom hook to use the authUserContext and access authUser and loading
export const useGoogleAuth = () => useContext(GoogleAuthContext);
