import { useAuth } from "@/providers/auth-provider";
import { useGetMainCart } from "./react-query-hooks/cart-hooks/useGetMainCart";
import { UserMainCartI } from "@/types/cart/cart.types";

export function useCart() {
  const { loggedInUser } = useAuth();
  const userId = loggedInUser?.id;

  const {
    data: cart,
    isLoading: isCartLoading,
    isFetching,
    error: cartError,
  } = useGetMainCart({ userId });

  if (loggedInUser && userId) {
    return {
      cart,
      isLoading: isCartLoading,
      isFetching,
      error: cartError,
    };
  } else {
    return {
      cart: {
        cartItems: [],
        id: -1,
        type: "main",
      } as UserMainCartI,
      isLoading: false,
      isFetching: false,
      error: null,
    };
  }
}
