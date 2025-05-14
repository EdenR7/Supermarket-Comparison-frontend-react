import UserCartDropDownProducts from "./user-cart-drop-down-products";
import { CartItemI } from "@/types/cart/cart.types";
import ClearCartButton from "@/components/shared/clear-cart-button";

interface UserCartDropDownContentProps {
  cartItems: CartItemI[];
  cartId: number;
}

function UserCartDropDownContent({
  cartItems,
  cartId,
}: UserCartDropDownContentProps) {
  return (
    <>
      <ClearCartButton
        cartId={cartId}
        isMainCart={true}
        className="ms-auto block"
      />
      <UserCartDropDownProducts cartItems={cartItems} cartId={cartId} />
    </>
  );
}

export default UserCartDropDownContent;
