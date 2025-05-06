import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppLoader from "@/components/shared/app-loader";
import { useCombinedGetAllCountAllProducts } from "@/hooks/react-query-hooks/products-hooks/combined-get_all-count_all";
import PaginatorApp from "@/components/shared/pagination-app";
import ProductCard from "@/components/products-page/product-card";

function ProductsPage() {
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

  return (
    <div className=" flex flex-col gap-4">
      <ul className="grid gap-4 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <li className="max-w-xs" key={product.id}>
            <ProductCard product={product} />
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
