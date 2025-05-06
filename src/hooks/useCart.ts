import { useAuth } from "@/providers/auth-provider";
import { useGetMainCart } from "./react-query-hooks/cart-hooks/useGetMainCart";

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
      cart: null,
      isLoading: false,
      isFetching: false,
      error: null,
    };
  }
}
