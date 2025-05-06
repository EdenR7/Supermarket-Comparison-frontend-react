import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useUserCart } from "@/providers/user_cart-provider";
import { useMemo, useState } from "react";
import useDeleteCartItem from "@/hooks/react-query-hooks/cart-hooks/useDeleteCartItem";
import { useAuth } from "@/providers/auth-provider";

interface ChangeProductQtyProps {
  productId: number;
}

function ChangeProductQty({ productId }: ChangeProductQtyProps) {
  const { userMainCart } = useUserCart();
  const { loggedInUser } = useAuth();
  const deleteCartItemHandler = useDeleteCartItem(loggedInUser?.id);
  const cartItemId = useMemo(
    () =>
      userMainCart?.cartItems.find((item) => item.product.id === productId)?.id,
    [userMainCart, productId]
  );

  const [qty, setQty] = useState(getQty);

  function getQty() {
    if (!userMainCart) return 0;
    const cartItem = userMainCart.cartItems.find(
      (item) => item.product.id === productId
    );
    return cartItem?.quantity || 0;
  }

  function handleQtyChange(value: number) {
    setQty(value);
  }

  function handleMinusClick() {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    } else if (userMainCart?.id && cartItemId) {
      deleteCartItemHandler.mutate({
        cartId: userMainCart.id,
        cartItemId: cartItemId,
      });
    } else {
      console.log("no cart id or cart item id");
    }
  }

  function handlePlusClick() {
    setQty((prev) => prev + 1);
  }

  return (
    <div className="flex items-center gap-2 justify-between">
      <Button
        variant="outline"
        className="text-sm px-2"
        onClick={handleMinusClick}
        disabled={qty === 0}
      >
        <Minus size={14} />
      </Button>
      <Input
        value={qty}
        type="number"
        className="max-w-24 text-center font-semibold"
        onChange={(e) => handleQtyChange(Number(e.target.value))}
      />
      <Button
        variant="outline"
        className="text-sm px-2"
        onClick={handlePlusClick}
      >
        <Plus size={14} />
      </Button>
    </div>
  );
}

export default ChangeProductQty;
