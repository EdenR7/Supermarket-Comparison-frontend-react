import ChangeProductQty from "@/components/shared/change-product-qty";
import RemoveItemFromCartButton from "@/components/shared/remove-item-from-cart-button";
import { Separator } from "@/components/ui/separator";
import { CartItemI } from "@/types/cart/cart.types";

interface UserCartDropDownProductsProps {
  cartItems: CartItemI[];
  cartId: number;
}

function UserCartDropDownProducts({
  cartItems,
  cartId,
}: UserCartDropDownProductsProps) {
  console.log("cartItems", cartItems);

  return (
    <ul>
      {cartItems.map((cartItem, index) => (
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
            <div className="min-w-40 flex flex-col gap-2">
              <ChangeProductQty productId={cartItem.product.id} />
              <RemoveItemFromCartButton
                cartItemId={cartItem.id}
                cartId={cartId}
              />
            </div>
          </div>
          {index !== cartItems.length - 1 && <Separator className="my-4" />}
        </li>
      ))}
    </ul>
  );
}

export default UserCartDropDownProducts;
