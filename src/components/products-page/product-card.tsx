import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ChangeProductQty from "../shared/change-product-qty";
import { ProductWithPricesI } from "@/types/products/product.types";
import AddToCartButton from "../shared/add-to-cart-button";
import { useMemo } from "react";
import { UserMainCartI } from "@/types/cart/cart.types";

interface ProductCardProps {
  product: ProductWithPricesI;
  cart: UserMainCartI;
}

function ProductCard({ product, cart: userCart }: ProductCardProps) {
  const isInCart = useMemo(() => {
    return userCart?.cartItems.some((item) => item.product.id === product.id);
  }, [userCart?.cartItems, product.id]);

  function claculateAvgPrice(prices: { price: number }[]) {
    const total = prices.reduce((acc, price) => acc + Number(price.price), 0);
    return (total / prices.length).toFixed(2);
  }

  if (!product || !product.id) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <img
          src={
            product.img_url ||
            "https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/AAL20_Z_P_4131074_1.png"
          }
          alt={product.name}
        />
      </CardHeader>
      <CardContent className="space-y-2">
        <CardDescription className=" space-x-1">
          <span className="underline">Avg price:</span>
          <span className="font-bold">
            {claculateAvgPrice(product.prices)}₪
          </span>
        </CardDescription>
        {isInCart ? (
          <div className="max-w-52 mx-auto">
            {<ChangeProductQty productId={product.id} />}
          </div>
        ) : (
          <div className="flex justify-center">
            <AddToCartButton product={product} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ProductCard;
