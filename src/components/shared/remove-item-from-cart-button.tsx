import { useAuth } from "@/providers/auth-provider";
import { Button } from "../ui/button";
import useDeleteCartItem from "@/hooks/react-query-hooks/cart-hooks/useDeleteCartItem";

interface RemoveItemFromCartButtonProps {
  cartItemId: number;
  cartId: number;
  isMainCart?: boolean;
}

function RemoveItemFromCartButton({
  cartItemId,
  cartId,
  isMainCart = true,
}: RemoveItemFromCartButtonProps) {
  const { loggedInUser } = useAuth();
  const deleteCartItemHandler = useDeleteCartItem(loggedInUser?.id);
  return (
    <Button
      onClick={() =>
        deleteCartItemHandler.mutateAsync({
          cartId,
          cartItemId,
          isMainCart,
        })
      }
    >
      Remove Item
    </Button>
  );
}

export default RemoveItemFromCartButton;
