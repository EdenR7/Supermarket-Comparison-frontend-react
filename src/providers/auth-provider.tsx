import { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { RegisterFormValues } from "@/pages/register-page";
import { LoginFormValues as LoginCredentials } from "@/pages/login-page";
import { LoggedInUserI } from "@/types/users/user.types";
import { userService } from "@/services/api/userService";
import { authService } from "@/services/api/authService";
import { UserMainCartI } from "@/types/cart/cart.types";
import { GUEST_CART_KEY } from "@/services/localStorage/guestCartService";
import { cartService } from "@/services/api/cartService";

interface AuthContextType {
  loggedInUser: LoggedInUserI | null | undefined;
  // setLoggedInUser: React.Dispatch<
  //   React.SetStateAction<LoggedInUserI | null | undefined>
  // >;
  login: (user: LoginCredentials) => Promise<void>;
  register: (user: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updateUserMainCart: (mainCart: UserMainCartI) => void;
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
      // If the user had local storage cart, add it to the user's main cart and delete it from local storage
      await mergeGuestCart();
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    } finally {
      localStorage.removeItem(GUEST_CART_KEY);
    }
  }

  async function mergeGuestCart() {
    try {
      const localCart = localStorage.getItem(GUEST_CART_KEY);
      if (!localCart) {
        console.log("No guest cart found");
        throw new Error("No guest cart found");
      }
      const parsedCart = JSON.parse(localCart) as UserMainCartI;
      if (parsedCart.cartItems.length === 0 || !parsedCart) return;
      const cartItemsForCreation = parsedCart.cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }));
      await cartService.mergeGuestCart(cartItemsForCreation);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    } finally {
      localStorage.removeItem(GUEST_CART_KEY);
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

  function updateUserMainCart(mainCart: UserMainCartI) {
    setLoggedInUser((prev: LoggedInUserI | null | undefined) => ({
      ...prev!,
      mainCart: mainCart,
    }));
  }

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        // setLoggedInUser,
        login,
        register,
        logout,
        updateUserMainCart,
      }}
    >
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
