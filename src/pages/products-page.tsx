import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppLoader from "@/components/shared/app-loader";
import { useCombinedGetAllCountAllProducts } from "@/hooks/react-query-hooks/combined-get_all-count_all";

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

  const combinedData = useCombinedGetAllCountAllProducts(
    { name: nameQueryParams, category: categoryQueryParams },
    { page, size: 5 }
  );
  const { totalProductsNumber, products, isLoading } = combinedData;

  console.log(totalProductsNumber, products);

  if (combinedData.isLoading) {
    return <AppLoader />;
  }

  return <div>ProductsPage</div>;
}

export default ProductsPage;
