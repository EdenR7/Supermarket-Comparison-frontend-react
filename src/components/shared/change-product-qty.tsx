import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useMemo, useState } from "react";
import useDeleteCartItem from "@/hooks/react-query-hooks/cart-hooks/useDeleteCartItem";
import { useChangeCartItemQty } from "@/hooks/react-query-hooks/cart-hooks/useChangeCartItemQty";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallbacks";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/providers/auth-provider";

interface ChangeProductQtyProps {
  productId: number;
  isMainCart: boolean;
}

function ChangeProductQty({
  productId,
  isMainCart = true,
}: ChangeProductQtyProps) {
  const { cart: userMainCart } = useCart();
  const { loggedInUser } = useAuth();
  const deleteCartItemHandler = useDeleteCartItem(loggedInUser?.id);
  const changeCartItemQtyHandler = useChangeCartItemQty(loggedInUser?.id);
  const debouncedChangeCartItemQty = useDebouncedCallback(
    (newQty: number, cartItemId: number) => {
      changeCartItemQtyHandler.mutateAsync({
        cartItemId: cartItemId,
        newQty: newQty,
        isMainCart: isMainCart,
      });
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
    setQty(value);
    if (userMainCart?.id && cartItem?.id) {
      debouncedChangeCartItemQty(value, cartItem.id);
    }
  }

  function handleMinusClick() {
    if (qty > 1) {
      handleQtyChange(qty - 1);
    } else if (userMainCart?.id && cartItem?.id) {
      deleteCartItemHandler.mutateAsync({
        cartId: userMainCart.id,
        cartItemId: cartItem.id,
        isMainCart,
      });
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
