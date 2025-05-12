import { useAuth } from "@/providers/auth-provider";
import { Button } from "../ui/button";
// import { useAddCartItem } from "@/hooks/react-query-hooks/cart-hooks/useAddCartItem";
import { useUserMainCart } from "@/providers/user_cart-provider";
import { useAddCartItem } from "@/hooks/react-query-hooks/cart-hooks/useAddCartItem";

interface AddToCartButtonProps {
  productId: number;
  cartId: number;
  isMainCart: boolean;
}

function AddToCartButton({
  productId,
  cartId,
  isMainCart,
}: AddToCartButtonProps) {
  const { loggedInUser } = useAuth();
  const { addProductToCart } = useUserMainCart();
  const addItemHandler = useAddCartItem(loggedInUser?.id);

  async function handleAddProductToCart() {
    if (loggedInUser) {
      const newCartItem = await addItemHandler.mutateAsync({
        cartId: cartId,
        productId,
        quantity: 1,
      });
      if (isMainCart) addProductToCart(newCartItem);
    } else {
      console.log("Please login to add to cart");
    }
  }
  return <Button onClick={handleAddProductToCart}>Add To Cart</Button>;
}

export default AddToCartButton;
