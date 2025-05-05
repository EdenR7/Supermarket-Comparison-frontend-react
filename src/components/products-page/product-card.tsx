import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import ChangeProductQty from "../shared/change-product-qty";
import { ProductWithPricesI } from "@/types/products/product.types";

function ProductCard({ product }: { product: ProductWithPricesI }) {
  function claculateAvgPrice(prices: { price: number }[]) {
    const total = prices.reduce((acc, price) => acc + Number(price.price), 0);
    return (total / prices.length).toFixed(2);
  }

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
          <span className="font-bold">{claculateAvgPrice(product.prices)}₪</span>
        </CardDescription>
        <div className="flex justify-center">
          <Button>Add To Cart</Button>
        </div>
        <div className="max-w-52 mx-auto">{/* <ChangeProductQty /> */}</div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
