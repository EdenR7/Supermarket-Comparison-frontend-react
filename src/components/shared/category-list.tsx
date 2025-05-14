import { PRODUCT_CATEGORIES } from "@/constants/product.constants";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function CategoryList() {
  const { length: categoryLength } = PRODUCT_CATEGORIES;
  const navigate = useNavigate();

  function handleCategoryClick(category: string) {
    navigate(`/products?category=${category}`);
  }

  return (
    <ul className="flex items-center justify-evenly">
      {PRODUCT_CATEGORIES.map((category, index) => (
        <React.Fragment key={category + index}>
          <li
            className="flex hover:text-primary text-secondary transition-colors cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <Button
              className="text-xs font-normal break-700px:text-sm break-750px:font-semibold"
              variant={"naked"}
            >
              {category}
            </Button>
          </li>
          {index != categoryLength - 1 && (
            <Separator orientation="vertical" className="h-8" />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}

export default CategoryList;
