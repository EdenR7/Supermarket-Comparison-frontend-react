import { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { RegisterFormValues } from "@/pages/register-page";
import { LoginFormValues as LoginCredentials } from "@/pages/login-page";
import { LoggedInUserI } from "@/types/users/user.types";
import { userService } from "@/services/api/userService";
import { authService } from "@/services/api/authService";

interface AuthContextType {
  loggedInUser: LoggedInUserI | null | undefined;
  login: (user: LoginCredentials) => Promise<void>;
  register: (user: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

type RegisterCredentials = Omit<RegisterFormValues, "confirmPassword">;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<
    LoggedInUserI | null | undefined
  >(undefined);
  const [token, setToken] = useLocalStorage("super-market-token", null);

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    fetchUser();
  }, [token]);

  function logout() {
    setToken(null);
    setLoggedInUser(null);
  }

  async function fetchUser() {
    const user = await userService.getUser();
    if (user) {
      console.log("user", user);
      setLoggedInUser(user);
    } else {
      logout();
    }
  }

  async function login(cred: LoginCredentials) {
    try {
      const response = await authService.login(cred);
      setToken(response.data.token);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async function register(cred: RegisterCredentials) {
    try {
      const response = await authService.register(cred);
      setToken(response.data?.token);
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
