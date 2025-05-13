import { cartService } from "@/services/api/cartService";
import { UserMainCartI } from "@/types/cart/cart.types";
import { ProductWithPricesI } from "@/types/products/product.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// This hook is used to add a product to a cart, if its the user main cart so it will also update the context state
export function useAddCartItem(userId: number | undefined) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      product,
      quantity,
    }: {
      cartId: number;
      product: ProductWithPricesI;
      quantity: number;
      isMainCart: boolean;
    }) => {
      if (!userId) {
        // Return a rejected promise to prevent execution
        return Promise.reject(new Error("User not authenticated"));
      }
      return cartService.addProductToCart(cartId, product.id, quantity);
    },
    onSuccess(newCartItem) {
      qc.setQueryData(["mainCart", userId], (oldData: UserMainCartI) => {
        return {
          ...oldData,
          cartItems: [...oldData.cartItems, newCartItem],
        };
      });

      return newCartItem;
    },
    onError: (error) => {
      console.log("onError", error);
    },
  });
}
