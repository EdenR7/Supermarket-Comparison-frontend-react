import { Button, ButtonProps } from "../ui/button";
import { useClearCart } from "@/hooks/react-query-hooks/cart-hooks/useClearCart";
import { useAuth } from "@/providers/auth-provider";

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
  const { loggedInUser } = useAuth();
  const clearCartMutation = useClearCart({ userId: loggedInUser?.id });

  async function handleClearCart() {
    if (loggedInUser) {
      try {
        await clearCartMutation.mutateAsync({
          cartId,
          isMainCart,
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    } else {
      console.log("Please login to clear cart");
    }
  }

  return (
    <Button
      variant={variant}
      onClick={handleClearCart}
      disabled={clearCartMutation.isPending}
      {...buttonProps}
    >
      {clearCartMutation.isPending ? "Clearing..." : children}
    </Button>
  );
}

export default ClearCartButton;
