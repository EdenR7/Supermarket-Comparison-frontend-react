import { useAuth } from "@/providers/auth-provider";
import { useGetMainCart } from "./react-query-hooks/cart-hooks/useGetMainCart";
import { UserMainCartI } from "@/types/cart/cart.types";
import { useAddCartItem } from "./react-query-hooks/cart-hooks/useAddCartItem";
import { useChangeCartItemQty } from "./react-query-hooks/cart-hooks/useChangeCartItemQty";
import useDeleteCartItem from "./react-query-hooks/cart-hooks/useDeleteCartItem";
import { useClearCart } from "./react-query-hooks/cart-hooks/useClearCart";
import { useCallback, useEffect, useState } from "react";
import { guestCartService } from "@/services/localStorage/guestCartService";
import { ProductWithPricesI } from "@/types/products/product.types";

// export function useMainCart() {
//   const { loggedInUser } = useAuth();
//   const userId = loggedInUser?.id;

//   const {
//     data: fetchedCart,
//     isLoading: isCartLoading,
//     isFetching,
//     error: cartError,
//   } = useGetMainCart({ userId });

//   if (userId) {
//     return {
//       cart: fetchedCart,
//       isLoading: isCartLoading,
//       isFetching,
//       error: cartError,
//     };
//   } else {
//     return {
//       cart: {
//         cartItems: [],
//         id: -1,
//         type: "main",
//       } as UserMainCartI,
//       isLoading: false,
//       isFetching: false,
//       error: null,
//     };
//   }
// }
