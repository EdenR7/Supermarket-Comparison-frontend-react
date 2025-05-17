import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallbacks";
import { useUserMainCart } from "@/providers/user_cart-provider";

interface ChangeProductQtyProps {
  productId: number;
  isMainCart?: boolean;
}

function ChangeProductQty({ productId }: ChangeProductQtyProps) {
  const { userMainCart, updateProductQty, removeProductFromCart } =
    useUserMainCart();

  const debouncedChangeCartItemQty = useDebouncedCallback(
    (newQty: number, cartItemId: number) => {
      updateProductQty(cartItemId, newQty);
    },
    500
  );

  const cartItem = useMemo(
    () => userMainCart?.cartItems.find((item) => item.product.id === productId),
    [userMainCart?.cartItems, productId]
  );

  const [qty, setQty] = useState(() => cartItem?.quantity || 0);

  useEffect(() => {
    if (cartItem?.quantity !== undefined && cartItem.quantity !== qty) {
      setQty(cartItem.quantity);
    }
  }, [cartItem?.quantity]);

  function handleQtyChange(value: number) {
    if (value < 1) {
      if (userMainCart?.id && cartItem?.id) removeProductFromCart(cartItem.id);
    }
    setQty(value);
    if (userMainCart?.id && cartItem?.id) {
      debouncedChangeCartItemQty(value, cartItem.id);
    }
  }

  function handleMinusClick() {
    if (qty > 1) {
      handleQtyChange(qty - 1);
    } else if (userMainCart?.id && cartItem?.id) {
      removeProductFromCart(cartItem.id);
    }
  }

  function handlePlusClick() {
    handleQtyChange(qty + 1);
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
