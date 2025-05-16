import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppLoader from "@/components/shared/app-loader";
import { useCombinedGetAllCountAllProducts } from "@/hooks/react-query-hooks/products-hooks/combined-get_all-count_all";
import PaginatorApp from "@/components/shared/pagination-app";
import ProductCard from "@/components/products-page/product-card";
import { useUserMainCart } from "@/providers/user_cart-provider";

function ProductsPage() {
  const { userMainCart } = useUserMainCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQueryParams = searchParams.get("category") || "";
  const nameQueryParams = searchParams.get("name") || "";

  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    if (!categoryQueryParams) {
      setSearchParams({ category: "Milk and Eggs" });
    }
    setPage(1);
  }, [categoryQueryParams]);

  const combinedData = useCombinedGetAllCountAllProducts(
    { name: nameQueryParams, category: categoryQueryParams },
    { page, size: pageSize }
  );
  const { totalProductsNumber, products, isLoading } = combinedData;

  if (isLoading) {
    return <AppLoader />;
  }

  if (!userMainCart) {
    return <div>No cart found</div>;
  }

  return (
    <div className=" flex flex-col items-center gap-4 mx-auto">
      <ul className="grid gap-1 justify-items-center grid-cols-1 break-450px:grid-cols-2 break-700px:grid-cols-3 break-950px:grid-cols-4 max-w-7xl">
        {products?.map((product) => (
          <li className="max-w-xs" key={product.id}>
            <ProductCard product={product} type="page" />
          </li>
        ))}
      </ul>
      <PaginatorApp
        page={page}
        perPage={pageSize}
        setPage={setPage}
        totalEntities={totalProductsNumber || 0}
      />
    </div>
  );
}

export default ProductsPage;
