// import { useAuth } from "@/providers/auth-provider";
// import { useGetMainCart } from "./react-query-hooks/cart-hooks/useGetMainCart";
// import { useAddCartItem } from "./react-query-hooks/cart-hooks/useAddCartItem";
// import { useChangeCartItemQty } from "./react-query-hooks/cart-hooks/useChangeCartItemQty";
// import useDeleteCartItem from "./react-query-hooks/cart-hooks/useDeleteCartItem";
// import { useClearCart } from "./react-query-hooks/cart-hooks/useClearCart";
// import { guestCartService } from "@/services/localStorage/guestCartService";
// import { ProductWithPricesI } from "@/types/products/product.types";
// import { UserMainCartI } from "@/types/cart/cart.types";
// import { useState, useEffect, useCallback } from "react";

// export function useUnifiedCart() {
//   const { loggedInUser } = useAuth();
//   const userId = loggedInUser?.id;
//   const isAuthenticated = !!userId;

//   // For authenticated users - use existing React Query hooks
//   const {
//     data: authCart,
//     isLoading: isAuthLoading,
//     error: authError,
//     refetch: refetchAuthCart,
//   } = useGetMainCart({ userId });

//   const addAuthCartItem = useAddCartItem(userId);
//   const changeAuthCartItemQty = useChangeCartItemQty(userId);
//   const deleteAuthCartItem = useDeleteCartItem(userId);
//   const clearAuthCart = useClearCart(userId);

//   // For guest users - manage local state
//   const [guestCart, setGuestCart] = useState<UserMainCartI | null>(null);
//   const [isGuestLoading, setIsGuestLoading] = useState(true);
//   const [guestError, setGuestError] = useState<Error | null>(null);

//   // Load guest cart on mount if not authenticated
//   useEffect(() => {
//     if (!isAuthenticated) {
//       const loadGuestCart = async () => {
//         try {
//           setIsGuestLoading(true);
//           const cart = await guestCartService.getUserMainCart();
//           setGuestCart(cart);
//         } catch (error) {
//           setGuestError(
//             error instanceof Error
//               ? error
//               : new Error("Failed to load guest cart")
//           );
//         } finally {
//           setIsGuestLoading(false);
//         }
//       };

//       loadGuestCart();
//     }
//   }, [isAuthenticated]);

//   // Refetch guest cart
//   const refetchGuestCart = useCallback(async () => {
//     if (!isAuthenticated) {
//       try {
//         setIsGuestLoading(true);
//         const cart = await guestCartService.getUserMainCart();
//         setGuestCart(cart);
//         return cart;
//       } catch (error) {
//         setGuestError(
//           error instanceof Error
//             ? error
//             : new Error("Failed to refetch guest cart")
//         );
//         throw error;
//       } finally {
//         setIsGuestLoading(false);
//       }
//     }
//     return null;
//   }, [isAuthenticated]);

//   // Add to cart
//   const addToCart = useCallback(
//     async (product: ProductWithPricesI, quantity: number = 1) => {
//       if (isAuthenticated && authCart) {
//         return addAuthCartItem.mutateAsync({
//           cartId: authCart.id,
//           product,
//           quantity,
//           isMainCart: true,
//         });
//       } else {
//         const newItem = await guestCartService.addProductToCart(
//           -1,
//           product.id,
//           quantity,
//           product
//         );
//         await refetchGuestCart();
//         return newItem;
//       }
//     },
//     [isAuthenticated, authCart, addAuthCartItem, refetchGuestCart]
//   );

//   // Remove from cart
//   const removeFromCart = useCallback(
//     async (cartItemId: number) => {
//       if (isAuthenticated && authCart) {
//         return deleteAuthCartItem.mutateAsync({
//           cartId: authCart.id,
//           cartItemId,
//           isMainCart: true,
//         });
//       } else {
//         await guestCartService.deleteCartItem(-1, cartItemId);
//         await refetchGuestCart();
//       }
//     },
//     [isAuthenticated, authCart, deleteAuthCartItem, refetchGuestCart]
//   );

//   // Change item quantity
//   const changeItemQuantity = useCallback(
//     async (cartItemId: number, newQty: number) => {
//       if (isAuthenticated) {
//         return changeAuthCartItemQty.mutateAsync({
//           cartItemId,
//           newQty,
//           isMainCart: true,
//         });
//       } else {
//         await guestCartService.changeCartItemQty(cartItemId, newQty);
//         await refetchGuestCart();
//       }
//     },
//     [isAuthenticated, changeAuthCartItemQty, refetchGuestCart]
//   );

//   // Clear cart
//   const clearCart = useCallback(async () => {
//     if (isAuthenticated && authCart) {
//       return clearAuthCart.mutateAsync({
//         cartId: authCart.id,
//         isMainCart: true,
//       });
//     } else {
//       await guestCartService.clearCart(-1);
//       await refetchGuestCart();
//     }
//   }, [isAuthenticated, authCart, clearAuthCart, refetchGuestCart]);

//   // Determine which cart and loading state to use
//   const cart = isAuthenticated ? authCart : guestCart;
//   const isLoading = isAuthenticated ? isAuthLoading : isGuestLoading;
//   const error = isAuthenticated ? authError : guestError;

//   // Refetch cart
//   const refetch = useCallback(async () => {
//     if (isAuthenticated) {
//       return refetchAuthCart();
//     } else {
//       return refetchGuestCart();
//     }
//   }, [isAuthenticated, refetchAuthCart, refetchGuestCart]);

//   return {
//     cart,
//     isLoading,
//     error,
//     isAuthenticated,
//     addToCart,
//     removeFromCart,
//     changeItemQuantity,
//     clearCart,
//     refetch,
//     // Expose mutation states for UI feedback
//     isAddingToCart: isAuthenticated ? addAuthCartItem.isPending : false,
//     isRemovingFromCart: isAuthenticated ? deleteAuthCartItem.isPending : false,
//     isChangingQuantity: isAuthenticated
//       ? changeAuthCartItemQty.isPending
//       : false,
//     isClearingCart: isAuthenticated ? clearAuthCart.isPending : false,
//   };
// }
