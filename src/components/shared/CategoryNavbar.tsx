import CategoryList from "./category-list";
import CategorySelect from "./category-select";

export function CategoryNavbar() {
  return (
    <>
      <CategorySelect />
      <nav className="w-full max-w-screen-2xl mx-auto bg-red-500 border-b border-gray-200 shadow-sm overflow-x-auto scrollbar-hide">
        <div className="py-1 px-4 mx-auto sm:block hidden">
          <CategoryList />
        </div>
      </nav>
    </>
  );
}
