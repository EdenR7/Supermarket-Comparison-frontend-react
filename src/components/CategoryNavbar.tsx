import { useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "@/constants/product.constants";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import React from "react";

export function CategoryNavbar() {
  const categoryLength = PRODUCT_CATEGORIES.length;
  const navigate = useNavigate();

  function handleCategoryClick(category: string) {
    navigate(`/products?category=${category}`);
  }

  return (
    <nav className="w-full bg-red-500 border-b border-gray-200 shadow-sm overflow-x-auto scrollbar-hide">
      <div className="py-1 px-4 mx-auto">
        <ul className="flex items-center justify-evenly">
          {PRODUCT_CATEGORIES.map((category, index) => (
            <React.Fragment key={category + index}>
              <li
                className="flex hover:text-secondary transition-colors"
                onClick={() => handleCategoryClick(category)}
              >
                <Button variant={"naked"}>{category}</Button>
              </li>
              {index != categoryLength - 1 && (
                <Separator orientation="vertical" className="h-8" />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </nav>
  );
}
