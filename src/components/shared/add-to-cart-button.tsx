import { useAuth } from "@/providers/auth-provider";
import { Button } from "../ui/button";
import { useAddCartItem } from "@/hooks/react-query-hooks/cart-hooks/useAddCartItem";

interface AddToCartButtonProps {
  productId: number;
}

function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { loggedInUser } = useAuth();
  const addItemHandler = useAddCartItem(loggedInUser?.id);

  function handleAddProductToCart() {
    if (loggedInUser) {
      addItemHandler.mutate({
        cartId: loggedInUser.mainCartId,
        productId,
        quantity: 1,
      });
    } else {
      console.log("Please login to add to cart");
    }
  }
  return <Button onClick={handleAddProductToCart}>Add To Cart</Button>;
}

export default AddToCartButton;
