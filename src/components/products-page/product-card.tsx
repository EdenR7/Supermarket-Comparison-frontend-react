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
import { useUserMainCart } from "@/providers/user_cart-provider";
import { claculateAvgPrice } from "@/lib/utils";
import ProductTab from "../shared/product-tab";

interface ProductCardProps {
  product: ProductWithPricesI;
  type: "page" | "tab";
}

function ProductCard({ product, type }: ProductCardProps) {
  const { userMainCart: userCart } = useUserMainCart();

  const isInCart = useMemo(() => {
    return userCart?.cartItems.some((item) => item.product.id === product.id);
  }, [userCart?.cartItems, product.id]);

  if (!product || !product.id) return null;
  return type === "tab" ? (
    <ProductTab product={product} isInCart={isInCart || false} />
  ) : (
    <Card className="h-full hover:scale-[1.01] transition-all duration-75">
      <CardHeader className="space-y-4">
        <img
          className="w-1/2 mx-auto"
          src={
            product.img_url ||
            "https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/AAL20_Z_P_4131074_1.png"
          }
          alt={product.name}
        />
        <CardTitle className="text-md">{product.name}</CardTitle>
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
