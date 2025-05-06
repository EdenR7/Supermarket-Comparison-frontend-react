import { Button } from "../ui/button";
import { useUserCart } from "@/providers/user_cart-provider";

interface AddToCartButtonProps {
  productId: number;
}

function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addProductToCart } = useUserCart();

  function handleAddProductToCart() {
    addProductToCart(productId, 1);
  }
  return <Button onClick={handleAddProductToCart}>Add To Cart</Button>;
}

export default AddToCartButton;
