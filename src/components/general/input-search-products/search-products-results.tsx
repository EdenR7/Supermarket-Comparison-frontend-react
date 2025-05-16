import ProductCard from "@/components/products-page/product-card";
import { SkeletonList } from "@/components/ui/skeleton-list";
import { ProductWithPricesI } from "@/types/products/product.types";

interface SearchProductsResultsProps {
  isLoading: boolean;
  products: ProductWithPricesI[];
}

function SearchProductsResults({
  isLoading,
  products,
}: SearchProductsResultsProps) {
  const productsLength = products.length;
  return (
    <div
      className={`absolute top-16 break-500px:top-12 left-0 sm:left-auto sm:right-0 sm:mr-0 break-950px:max-w-none min-w-[370px] max-w-500 w-full rounded-md border bg-white shadow z-50 py-4 ${
        productsLength && "max-h-[70vh] overflow-y-scroll"
      }`}
    >
      {productsLength < 1 && (
        <p className="text-center text-gray-500">No products found</p>
      )}
      <div>
        {isLoading ? (
          <SkeletonList />
        ) : (
          <ul className="px-4 space-y-4">
            {products?.map((product) => (
              <li className="" key={product.id}>
                <ProductCard product={product} type="tab" />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>{isLoading && <SkeletonList />}</div>
    </div>
  );
}

export default SearchProductsResults;
