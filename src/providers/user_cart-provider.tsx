import { CartItemI, UserMainCartI } from "@/types/cart/cart.types";
import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "./auth-provider";

interface UserCartContextType {
  userMainCart: UserMainCartI | null;
  userId: number | undefined;
  addProductToCart: (newCartItem: CartItemI) => void;
  removeProductFromCart: (cartItemId: number) => void;
  updateProductQty: (cartItemId: number, newQty: number) => number | undefined;
  isProductInCart: (productId: number) => boolean;
}

const UserCartContext = createContext<UserCartContextType | null>(null);

export const UserCartProvider = ({ children }: { children: ReactNode }) => {
  const { loggedInUser, updateUserMainCart } = useAuth();
  const userMainCart = loggedInUser?.mainCart || null;
  const userId = loggedInUser?.id;

  function addProductToCart(newCartItem: CartItemI) {
    if (!userMainCart || !userMainCart.id) {
      console.error("No user main cart found");
      return;
    }
    updateUserMainCart({
      ...userMainCart,
      cartItems: [...userMainCart.cartItems, newCartItem],
    });
  }

  function removeProductFromCart(cartItemId: number) {
    if (!userMainCart || !userMainCart.id) {
      console.error("No user main cart found");
      return;
    }
    // console.log("removing product from cart", cartItemId);
    updateUserMainCart({
      ...userMainCart,
      cartItems: userMainCart.cartItems.filter(
        (item) => item.id !== cartItemId
      ),
    });
  }

  function updateProductQty(cartItemId: number, newQty: number) {
    if (!userMainCart || !userMainCart.id) {
      console.error("No user main cart found");
      return;
    }
    let prevQty;
    updateUserMainCart({
      ...userMainCart,
      cartItems: userMainCart.cartItems.map((item) => {
        if (item.id === cartItemId) {
          prevQty = item.quantity;
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    });
    return prevQty;
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
      value={{
        userMainCart,
        userId,
        addProductToCart,
        updateProductQty,
        isProductInCart,
        removeProductFromCart,
      }}
    >
      {children}
    </UserCartContext.Provider>
  );
};

export function useUserMainCart() {
  const context = useContext(UserCartContext);
  if (!context) {
    throw new Error("useUserMainCart must be used within a UserCartProvider");
  }
  return context;
}
