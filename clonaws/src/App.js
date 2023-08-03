import { useEffect, useMemo } from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { useState } from "react";
import Auth from "./pages/Auth";
import { getToken, removeToken } from "./utils/token";
import AuthContext from "./contexts/AuthContext";
import Navigation from "./routes/Navigation";
import { decodeToken } from "./utils/token";
export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation />}
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
