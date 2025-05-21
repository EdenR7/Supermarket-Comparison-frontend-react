import ComparisonDataTable from "@/components/comparison-page/comparison-data-table";
import { useUserMainCart } from "@/providers/user_cart-provider";

function ComparisonPage() {
  const { userMainCart } = useUserMainCart();

  if (!userMainCart?.cartItems.length || userMainCart.cartItems.length < 1) {
    return <div>Your cart is still empty!</div>;
  }
  return (
    <div>
      <ComparisonDataTable />
    </div>
  );
}

export default ComparisonPage;
