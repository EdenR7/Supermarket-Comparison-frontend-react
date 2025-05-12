import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

function UserCartDropDown() {
  const { cart: userMainCart, isFetching } = useCart();
  // console.log(isFetching);
  
  const cartItemsCount = userMainCart?.cartItems.length || 0;
  const isCartItemsLenReqMoreSpace = cartItemsCount > 99;
  return (
    <Popover>
      <PopoverTrigger>
        <div className=" relative">
          <div
            className={` absolute bg-red-500 text-white text-[10px]  rounded-full flex items-center justify-center ${
              isCartItemsLenReqMoreSpace
                ? "w-5 h-5 top-[-16px] right-[-10px]"
                : "w-4 h-4 top-[-12px] right-[-6px]"
            }`}
          >
            {cartItemsCount}
          </div>
          <ShoppingCart className="relative" size={20} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-500 w-screen">
        Place content for the popover here.
      </PopoverContent>
    </Popover>
  );
}

export default UserCartDropDown;
