import { CartItemI, UserMainCartI } from "@/types/cart/cart.types";
import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "./auth-provider";
import { cartService } from "@/services/api/cartService";

interface UserCartContextType {
  userMainCart: UserMainCartI | null;
  addProductToCart: (productId: number, quantity: number) => Promise<void>;
  isProductInCart: (productId: number) => boolean;
}

const UserCartContext = createContext<UserCartContextType | null>(null);

export const UserCartProvider = ({ children }: { children: ReactNode }) => {
  const { loggedInUser, updateUserMainCart } = useAuth();
  const userMainCart = loggedInUser?.mainCart || null;
  // const [userMainCart, setUserMainCart] = useState<UserMainCartI | null>(null);

  // useEffect(() => {
  // if (loggedInUser) {
  // setUserMainCart(loggedInUser.mainCart);
  // }
  // console.log("UserCartProvider useEffect");
  // Sync with local storage
  // }, [loggedInUser]);

  async function addProductToCart(productId: number, quantity: number = 1) {
    if (!userMainCart || !userMainCart.id) {
      console.error("No user main cart found");
      return;
    }
    try {
      const newCartItem: CartItemI = await cartService.addProductToCart(
        userMainCart.id,
        productId,
        quantity
      );

      // setUserMainCart({
      //   ...userMainCart,
      //   cartItems: [...userMainCart.cartItems, newCartItem],
      // });

      // setLoggedInUser((prev: LoggedInUserI | null | undefined) => ({
      //   ...prev!,
      //   mainCart: {
      //     ...userMainCart,
      //     cartItems: [...userMainCart.cartItems, newCartItem],
      //   },
      // }));
      updateUserMainCart({
        ...userMainCart,
        cartItems: [...userMainCart.cartItems, newCartItem],
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  function isProductInCart(productId: number): boolean {
    if (!userMainCart || !productId) return false;
    const isInCart = userMainCart?.cartItems.some(
      (item) => item.product?.id === productId
    );
    return isInCart;
  }

  return (
    <UserCartContext.Provider
      value={{ userMainCart, addProductToCart, isProductInCart }}
    >
      {children}
    </UserCartContext.Provider>
  );
};

export function useUserCart() {
  const context = useContext(UserCartContext);
  if (!context) {
    throw new Error("useUserCart must be used within a UserCartProvider");
  }
  return context;
}
