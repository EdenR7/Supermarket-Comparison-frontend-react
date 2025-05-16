import { claculateAvgPrice } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ProductWithPricesI } from "@/types/products/product.types";
import ChangeProductQty from "./change-product-qty";
import AddToCartButton from "./add-to-cart-button";

interface ProductTabProps {
  product: ProductWithPricesI;
  isInCart: boolean;
  //   ChangeProductQty: (productId: string) => void;
  //   AddToCartButton: (product: ProductWithPricesI) => void;
}

function ProductTab({ product, isInCart }: ProductTabProps) {
  return (
    <Card className="grid grid-cols-[1fr_168px] items-center justify-items-center">
      <CardHeader className="space-y-2">
        <CardTitle className={"text-md"}>{product.name}</CardTitle>
        <img
          className="w-1/2"
          src={
            product.img_url ||
            "https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/AAL20_Z_P_4131074_1.png"
          }
          alt={product.name}
        />
        <CardDescription className=" space-x-1">
          <span className="underline">Avg price: </span>
          <span className="font-bold">
            {claculateAvgPrice(product.prices)}₪
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-2">
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

export default ProductTab;
