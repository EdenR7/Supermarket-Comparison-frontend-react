import { Button } from "../ui/button";
import { ProductWithPricesI } from "@/types/products/product.types";
import { useUserMainCart } from "@/providers/user_cart-provider";

interface AddToCartButtonProps {
  product: ProductWithPricesI;
}

function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addProductToCart } = useUserMainCart();

  function handleAddProductToCart() {
    addProductToCart(product, 1);
  }
  return <Button onClick={handleAddProductToCart}>Add To Cart</Button>;
}

export default AddToCartButton;
