import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppLoader from "@/components/shared/app-loader";
import { useCombinedGetAllCountAllProducts } from "@/hooks/react-query-hooks/combined-get_all-count_all";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChangeProductQty from "@/components/shared/change-product-qty";
import PaginationApp from "@/components/shared/pagination-app";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQueryParams = searchParams.get("category") || "";
  const nameQueryParams = searchParams.get("name") || "";

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!categoryQueryParams) {
      setSearchParams({ category: "Milk and Eggs" });
    }
  }, []);

  const pageSize = 2;

  const combinedData = useCombinedGetAllCountAllProducts(
    { name: nameQueryParams, category: categoryQueryParams },
    { page, size: pageSize }
  );
  const { totalProductsNumber, products, isLoading } = combinedData;

  console.log(totalProductsNumber, products);
  function claculateAvgPrice(prices: { price: number }[]) {
    console.log(prices);
    const total = prices.reduce((acc, price) => acc + Number(price.price), 0);
    return (total / prices.length).toFixed(2);
  }

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <div className=" flex flex-col gap-4">
      <ul className="grid gap-4 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {" "}
        {products?.map((product) => (
          <li className="max-w-xs" key={product.id}>
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
                <CardDescription>
                  Avg price: {claculateAvgPrice(product.prices)}₪
                </CardDescription>
                <div className="flex justify-center">
                  <Button>Add To Cart</Button>
                </div>
                <div className="max-w-52 mx-auto">
                  <ChangeProductQty />
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <PaginationApp
        page={page}
        perPage={pageSize}
        setPage={setPage}
        totalEntities={totalProductsNumber || 0}
      />
    </div>
  );
}

export default ProductsPage;
