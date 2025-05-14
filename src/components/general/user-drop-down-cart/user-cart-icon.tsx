import { ShoppingCart } from "lucide-react";

interface UserCartIconProps {
  cartItemsCount: number;
  isCartItemsLenReqMoreSpace: boolean;
}

function UserCartIcon({
  cartItemsCount,
  isCartItemsLenReqMoreSpace,
}: UserCartIconProps) {
  return (
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
  );
}

export default UserCartIcon;
