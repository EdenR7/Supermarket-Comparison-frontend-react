import { useEffect, useRef, useState } from "react";
import { IconInput } from "@/components/ui/input";
import { Search } from "lucide-react";
import SearchProductsResults from "./search-products-results";
import useDebounce from "@/hooks/useDebounce";
import { useGetProducts } from "@/hooks/react-query-hooks/products-hooks/get-products";

export function SearchWithResults() {
  const [showResults, setShowResults] = useState(false);

  const [productNameQuery, setProductNameQuery] = useState("");
  const debouncedProductNameQuery = useDebounce({
    value: productNameQuery,
    delay: 500,
  });

  const { data: products, isLoading } = useGetProducts({
    name: debouncedProductNameQuery,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      e.stopPropagation();
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Modal */}
      {showResults && (
        <div className="absolute inset-0 h-screen bg-black/50 z-40" />
      )}

      <div
        ref={containerRef}
        className="break-500px:relative w-full h-full max-w-xl mx-auto "
      >
        <IconInput
          Icon={Search}
          // placeholder="חפש מוצרים"
          className="relative focus:outline-none focus-visible:ring-0 z-[100] ps-8"
          value={productNameQuery}
          onFocus={() => setShowResults(true)}
          onChange={(e) => {
            const value = e.target.value;
            setProductNameQuery(value);
          }}
        />

        {showResults &&
          products &&
          (products.length > 0 || debouncedProductNameQuery) && (
            <SearchProductsResults isLoading={isLoading} products={products} />
          )}
      </div>
    </>
  );
}
