import { Button, ButtonProps } from "../ui/button";
import { useUserMainCart } from "@/providers/user_cart-provider";

interface ClearCartButtonProps extends Omit<ButtonProps, "onClick"> {
  cartId: number;
  isMainCart: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  children?: React.ReactNode;
}

function ClearCartButton({
  cartId,
  isMainCart = true,
  variant = "secondary",
  children = "Clear Cart",
  ...buttonProps
}: ClearCartButtonProps) {
  const { clearCart, isLoading } = useUserMainCart();

  return (
    <Button
      variant={variant}
      onClick={clearCart}
      disabled={isLoading}
      {...buttonProps}
    >
      {isLoading ? "Clearing..." : children}
    </Button>
  );
}

export default ClearCartButton;
