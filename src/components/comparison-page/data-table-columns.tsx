import { SUPERMARKET_NAMES } from "@/constants/product.constants";
import { ColumnDef } from "@tanstack/react-table";

// export const columns: ColumnDef<ProductI>[] = [
//   {
//     accessorKey: "shufersal",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//   },
// ];

export const comparisonColumns: ColumnDef<any>[] = SUPERMARKET_NAMES.map(
  (supermarket) => ({
    accessorKey: supermarket,
    header: supermarket
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
  })
);
