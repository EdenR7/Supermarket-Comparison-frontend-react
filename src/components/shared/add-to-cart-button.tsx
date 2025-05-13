import { useAuth } from "@/providers/auth-provider";
import { Button } from "../ui/button";
import { useAddCartItem } from "@/hooks/react-query-hooks/cart-hooks/useAddCartItem";
import { ProductWithPricesI } from "@/types/products/product.types";

interface AddToCartButtonProps {
  product: ProductWithPricesI;
  cartId: number;
  isMainCart: boolean;
}

function AddToCartButton({
  product,
  cartId,
  isMainCart,
}: AddToCartButtonProps) {
  const { loggedInUser } = useAuth();
  const addItemHandler = useAddCartItem(loggedInUser?.id);

  async function handleAddProductToCart() {
    if (loggedInUser) {
      addItemHandler.mutateAsync({
        cartId: cartId,
        product: product,
        quantity: 1,
        isMainCart,
      });
      // console.log("newCartItem", newCartItem);
    } else {
      console.log("Please login to add to cart");
    }
  }
  return <Button onClick={handleAddProductToCart}>Add To Cart</Button>;
}

export default AddToCartButton;
