import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PRODUCT_CATEGORIES } from "@/constants/product.constants";

function CategorySelect() {
  const navigate = useNavigate();

  function handleCategoryClick(category: string) {
    navigate(`/products?category=${category}`);
  }

  return (
    <div className="sm:hidden">
      <Select onValueChange={handleCategoryClick} defaultValue="Milk and Eggs">
        <SelectTrigger className="w-full outline-none py-3 px-6 sm:pe-8 bg-red-500 data-[placeholder]:text-white text-white">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          sideOffset={0}
          collisionPadding={0}
          className="w-full "
        >
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {PRODUCT_CATEGORIES.map((category, index) => (
              <SelectItem
                onClick={() => handleCategoryClick(category)}
                className="cursor-pointer"
                key={category + index}
                value={category}
              >
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CategorySelect;
