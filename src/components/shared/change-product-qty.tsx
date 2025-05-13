import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useUserMainCart } from "@/providers/user_cart-provider";
import {  useEffect, useMemo, useState } from "react";
import useDeleteCartItem from "@/hooks/react-query-hooks/cart-hooks/useDeleteCartItem";
import { useAuth } from "@/providers/auth-provider";
import { useChangeCartItemQty } from "@/hooks/react-query-hooks/cart-hooks/useChangeCartItemQty";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallbacks";

interface ChangeProductQtyProps {
  productId: number;
  isMainCart: boolean;
}

function ChangeProductQty({
  productId,
  isMainCart = true,
}: ChangeProductQtyProps) {
  const { userMainCart } = useUserMainCart();
  const { loggedInUser } = useAuth();
  const deleteCartItemHandler = useDeleteCartItem(loggedInUser?.id);
  const cartItemId = useMemo(
    () =>
      userMainCart?.cartItems.find((item) => item.product.id === productId)?.id,
    [userMainCart, productId]
  );

  console.log(cartItemId);

  const debouncedChangeCartItemQty = useDebouncedCallback(
    (newQty: number, cartItemId: number) => {
      changeCartItemQtyHandler.mutate({
        cartItemId: cartItemId,
        newQty: newQty,
        isMainCart: isMainCart,
      });
    },
    400
  );

  const changeCartItemQtyHandler = useChangeCartItemQty({
    userId: loggedInUser?.id,
    cartItemId: cartItemId,
  });

  const [qty, setQty] = useState(getQty);

  function getQty() {
    if (!userMainCart) return 0;
    const cartItem = userMainCart.cartItems.find(
      (item) => item.product.id === productId
    );
    return cartItem?.quantity || 0;
  }

  useEffect(() => {
    setQty(getQty());
  }, [userMainCart]);

  function handleQtyChange(value: number) {
    setQty(value);
    if (userMainCart?.id && cartItemId) {
      debouncedChangeCartItemQty(value, cartItemId);
    }
  }

  function handleMinusClick() {
    if (qty > 1) {
      handleQtyChange(qty - 1);
    } else if (userMainCart?.id && cartItemId) {
      deleteCartItemHandler.mutate({
        cartId: userMainCart.id,
        cartItemId: cartItemId,
        isMainCart,
      });
    } else {
      console.log("no cart id or cart item id");
    }
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
        onClick={() => handleQtyChange(qty + 1)}
      >
        <Plus size={14} />
      </Button>
    </div>
  );
}

export default ChangeProductQty;
