import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Separator } from "../ui/separator";
import ChangeProductQty from "../shared/change-product-qty";
import { Button } from "../ui/button";
import useDeleteCartItem from "@/hooks/react-query-hooks/cart-hooks/useDeleteCartItem";
import { useAuth } from "@/providers/auth-provider";

function UserCartDropDown() {
  const { cart: userMainCart } = useCart();
  // const { loggedInUser } = useAuth();
  const cartItems = userMainCart?.cartItems;
  // const deleteCartItemHandler = useDeleteCartItem(loggedInUser?.id);


  const cartItemsCount = userMainCart?.cartItems.length || 0;
  const isCartItemsLenReqMoreSpace = cartItemsCount > 99;

  if (!cartItems) {
    return;
  }
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
      <PopoverContent className="max-w-500 w-[90vw]">
        <ul>
          {cartItems.length > 0 ? (
            cartItems.map((cartItem, index) => (
              <li key={"cartItem" + cartItem.id}>
                <div className="flex flex-col break-500px:flex-row items-center gap-4">
                  <div className="flex flex-col gap-2 items-center break-500px:items-start">
                    <h2 className="font-bold">{cartItem.product.name}</h2>
                    <img
                      className="w-1/3 h-1/3 mx-auto break-500px:mx-0"
                      src={
                        cartItem.product.img_url ||
                        "https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/AAL20_Z_P_4131074_1.png"
                      }
                      alt={cartItem.product.name}
                    />
                  </div>
                  <div className="min-w-40 flex flex-col gap-4">
                    <ChangeProductQty productId={cartItem.product.id} />
                    <Button>Remove Item</Button>
                  </div>
                </div>
                {index !== cartItems.length - 1 && (
                  <Separator className="my-4" />
                )}
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p>Your cart is empty</p>
            </div>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export default UserCartDropDown;
