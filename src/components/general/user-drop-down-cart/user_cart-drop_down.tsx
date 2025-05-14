import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import UserCartIcon from "./user-cart-icon";
import UserCartDropDownContent from "./user-cart-drop-down-content";
import { useEffect, useState } from "react";
import { useUserMainCart } from "@/providers/user_cart-provider";

function UserCartDropDown() {
  const { userMainCart } = useUserMainCart();
  const [popOverOpen, setPopOverOpen] = useState(false);
  const cartItems = userMainCart?.cartItems;

  const handlePopOverOpenChange = () => {
    setPopOverOpen((prev) => {
      return !cartItems?.length || cartItems.length < 0 ? false : !prev;
    });
  };

  useEffect(() => {
    if (!cartItems?.length) {
      setPopOverOpen(false);
    }
  }, [cartItems]);

  const cartItemsCount = userMainCart?.cartItems.length || 0;
  const isCartItemsLenReqMoreSpace = cartItemsCount > 99;

  if (!cartItems) {
    return;
  }
  return (
    <Popover open={popOverOpen} onOpenChange={handlePopOverOpenChange}>
      <PopoverTrigger>
        <UserCartIcon
          cartItemsCount={cartItemsCount}
          isCartItemsLenReqMoreSpace={isCartItemsLenReqMoreSpace}
        />
      </PopoverTrigger>
      <PopoverContent className="max-w-500 w-[90vw]">
        <UserCartDropDownContent
          cartItems={cartItems}
          cartId={userMainCart.id}
        />
      </PopoverContent>
    </Popover>
  );
}

export default UserCartDropDown;
