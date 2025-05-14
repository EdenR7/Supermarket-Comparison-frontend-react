import { CartItemI, UserMainCartI } from "@/types/cart/cart.types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth-provider";
import { cartService } from "@/services/api/cartService";
import { guestCartService } from "@/services/localStorage/guestCartService";
import { ProductWithPricesI } from "@/types/products/product.types";

interface UserCartContextType {
  userMainCart: UserMainCartI | null;
  userId: number | undefined;
  isLoading: boolean;
  addProductToCart: (product: ProductWithPricesI, quantity: number) => void;
  removeProductFromCart: (cartItemId: number) => void;
  updateProductQty: (cartItemId: number, newQty: number) => void;
  clearCart: () => void;
  isProductInCart: (productId: number) => boolean;
}

const UserCartContext = createContext<UserCartContextType | null>(null);

export const UserCartProvider = ({ children }: { children: ReactNode }) => {
  const { loggedInUser } = useAuth();
  const userId = loggedInUser?.id;

  const [userMainCart, setUserMainCart] = useState<UserMainCartI | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeUserMainCart();
  }, [userId]);

  async function wrapActionInLoading(action: () => Promise<void>) {
    setIsLoading(true);
    await action();
    setIsLoading(false);
  }

  async function initializeUserMainCart() {
    if (userId) {
      wrapActionInLoading(async () => {
        try {
          const userMainCart = await cartService.getUserMainCart();
          // sync userMainCart with guestCartService
          setUserMainCart(userMainCart);
        } catch (error) {
          console.error("Error initializing user main cart:", error);
        }
      });
    } else {
      const userMainCart = guestCartService.getUserMainCart();
      setUserMainCart(userMainCart);
    }
  }

  async function addProductToCart(
    product: ProductWithPricesI,
    quantity: number
  ) {
    let newCartItem: CartItemI | undefined;

    if (userId) {
      await wrapActionInLoading(async () => {
        try {
          newCartItem = await cartService.addProductToCart(
            userMainCart!.id,
            product.id,
            quantity
          );
        } catch (error) {
          console.error("Error adding product to cart:", error);
        }
      });
    } else {
      newCartItem = guestCartService.addProductToCart(product, quantity);
    }

    if (!newCartItem) return;

    setUserMainCart((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        cartItems: [...prev.cartItems, newCartItem as CartItemI],
      };
    });
  }

  async function removeProductFromCart(cartItemId: number) {
    if (!userMainCart) throw new Error("No user main cart found");
    if (userId) {
      wrapActionInLoading(async () => {
        try {
          await cartService.deleteCartItem(userMainCart.id, cartItemId);
        } catch (error) {
          console.error("Error deleting product from cart:", error);
        }
      });
    } else {
      guestCartService.deleteCartItem(cartItemId);
    }
    setUserMainCart((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        cartItems: prev.cartItems.filter((item) => item.id !== cartItemId),
      };
    });
  }

  async function updateProductQty(cartItemId: number, newQty: number) {
    if (!userMainCart) throw new Error("No user main cart found");
    if (userId) {
      wrapActionInLoading(async () => {
        try {
          await cartService.changeCartItemQty(cartItemId, newQty);
        } catch (error) {
          console.error("Error updating product quantity:", error);
        }
      });
    } else {
      guestCartService.changeCartItemQty(cartItemId, newQty);
    }
    setUserMainCart((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        cartItems: prev.cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQty } : item
        ),
      };
    });
  }

  async function clearCart() {
    if (!userMainCart) throw new Error("No user main cart found");
    if (userId) {
      wrapActionInLoading(async () => {
        try {
          await cartService.clearCart(userMainCart?.id);
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      });
    } else {
      guestCartService.clearCart();
    }
    setUserMainCart((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        cartItems: [],
      };
    });
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
        isLoading,
        addProductToCart,
        updateProductQty,
        isProductInCart,
        removeProductFromCart,
        clearCart,
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
